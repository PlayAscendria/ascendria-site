const http = require('http');
function check(path){
  return new Promise(resolve => {
    const opts = { host: '127.0.0.1', port: 5000, path };
    const req = http.get(opts, res => {
      console.log(`${path} ${res.statusCode} content-length=${res.headers['content-length']||'unknown'}`);
      res.resume();
      res.on('end', ()=> resolve());
    });
    req.on('error', err => { console.log(`${path} ERROR ${err.message}`); resolve(); });
  });
}
(async ()=>{ await check('/'); await check('/assets/libs/portal.bundle.js'); })();
