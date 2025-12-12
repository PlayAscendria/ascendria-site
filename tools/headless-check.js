const puppeteer = require('puppeteer');
(async ()=>{
  const url = 'http://127.0.0.1:5000/';
  const browser = await puppeteer.launch({headless:true,args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  const logs = [];
  page.on('console', msg => {
    const text = msg.text();
    logs.push({type:'console',text});
    console.log('PAGE_CONSOLE: ' + text);
  });
  page.on('pageerror', err => {
    logs.push({type:'pageerror',text:err.message});
    console.log('PAGE_ERROR: ' + err.message);
  });
  page.on('requestfailed', req => {
    const f = req.failure();
    const text = `${req.url()} ${f && f.errorText ? f.errorText : ''}`;
    logs.push({type:'requestfailed',text});
    console.log('REQUEST_FAILED: ' + text);
  });
  page.on('response', async res => {
    try{
      const u = res.url();
      const status = res.status();
      const headers = res.headers();
      if(u.includes('/assets/libs/portal.bundle.js') || u.endsWith('portal.bundle.js')){
        console.log(`BUNDLE_RESPONSE: ${status} ${u} content-length=${headers['content-length']||'unknown'}`);
      }
      if(status >= 400) console.log(`RESPONSE_ERROR: ${status} ${u}`);
    }catch(e){console.log('RESPONSE_HANDLER_ERROR', e.message)}
  });
  try{
    await page.goto(url, {waitUntil: 'networkidle2', timeout: 15000});
    console.log('PAGE_LOADED');
    await page.waitForTimeout(5000);
    await page.screenshot({path:'./tools/headless-screenshot.png',fullPage:false}).catch(()=>{});
    console.log('DONE');
  }catch(e){
    console.log('NAV_ERROR: ' + e.message);
  }finally{
    await browser.close();
  }
})();