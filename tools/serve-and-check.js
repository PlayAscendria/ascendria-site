const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const root = path.resolve(__dirname, '..', 'dist');
const port = 5000;
const mime = {
  '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.map':'application/octet-stream', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml'
};
function serve(req,res){
  let url = decodeURIComponent(new URL(req.url, `http://localhost`).pathname);
  if(url.endsWith('/')) url += 'index.html';
  const file = path.join(root, url);
  if(!file.startsWith(root)) return (res.writeHead(403), res.end('Forbidden'));
  fs.stat(file, (err, st) => {
    if(err) return (res.writeHead(404), res.end('Not found'));
    const ext = path.extname(file).toLowerCase();
    const ct = mime[ext] || 'application/octet-stream';
    res.writeHead(200, {'Content-Type': ct, 'Content-Length': st.size});
    const stream = fs.createReadStream(file);
    stream.pipe(res);
  });
}
(async ()=>{
  const server = http.createServer(serve);
  server.listen(port, '127.0.0.1', async () => {
    console.log(`Server listening http://127.0.0.1:${port}/`);
    // Run headless check
    const url = `http://127.0.0.1:${port}/`;
    const browser = await puppeteer.launch({headless:true,args:['--no-sandbox','--disable-setuid-sandbox']});
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE_CONSOLE:', msg.text()));
    page.on('pageerror', e => console.log('PAGE_ERROR:', e.message));
    page.on('requestfailed', req => { const f = req.failure(); console.log('REQUEST_FAILED:', req.url(), f && f.errorText); });
    page.on('response', async res => {
      const u = res.url();
      const s = res.status();
      const h = res.headers();
      if(u.includes('/assets/libs/portal.bundle.js') || u.endsWith('portal.bundle.js')){
        console.log(`BUNDLE_RESPONSE: ${s} ${u} content-length=${h['content-length'] || 'unknown'}`);
      }
      if(s >= 400) console.log(`RESPONSE_ERROR: ${s} ${u}`);
    });
    try{
      await page.goto(url, {waitUntil:'networkidle2', timeout:20000});
      console.log('PAGE_LOADED');
      await page.waitForTimeout(4000);
    }catch(e){ console.log('NAV_ERROR:', e.message) }
    await browser.close();
    server.close(()=>{console.log('Server closed');});
  });
})();
