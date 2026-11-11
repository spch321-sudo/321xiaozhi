var VER='v2026.1111.1404',PFX='xiaozhi321-',CACHE=PFX+VER;
var SHELL=['./','index.html','sc.html','en.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','favicon.ico'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return Promise.all(SHELL.map(function(u){return fetch(new Request(u,{cache:'reload'})).then(function(r){if(r.ok)return c.put(u,r);}).catch(function(){});}));}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k.indexOf(PFX)===0&&k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}).then(function(){return self.clients.matchAll({type:'window'});}).then(function(cs){cs.forEach(function(c){try{c.postMessage({t:'sw-updated',v:VER});if(c.visibilityState==='hidden'&&c.navigate)c.navigate(c.url);}catch(e){}});}));});
self.addEventListener('message',function(e){if(e.data==='skip')self.skipWaiting();});
self.addEventListener('fetch',function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin) return;
 if(/version\.json$/.test(u.pathname)){e.respondWith(fetch(r,{cache:'no-store'}).catch(function(){return new Response('{}',{headers:{'Content-Type':'application/json'}});}));return;}
 var nav=r.mode==='navigate',pg=u.pathname.replace(/^.*\//,''),key=nav?(/^(sc|en)\.html$/.test(pg)?pg:'index.html'):u.pathname.replace(/^.*\//,'')||'index.html';
 if(nav||/\.(html|js|json|css|webmanifest)$/.test(u.pathname)){
  e.respondWith(fetch(r,{cache:'no-cache'}).then(function(res){if(res.ok){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(key,cp);});}return res;}).catch(function(){return caches.match(key).then(function(m){return m||caches.match('index.html');});}));return;
 }
 e.respondWith(caches.match(key).then(function(m){return m||fetch(r).then(function(res){if(res.ok){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(key,cp);});}return res;});}));
});
