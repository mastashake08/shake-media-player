if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,l)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let n={};const o=e=>i(e,a),t={module:{uri:a},exports:n,require:o};s[a]=Promise.all(r.map((e=>t[e]||o(e)))).then((e=>(l(...e),n)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"shake-media-player"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/shake-media-player/css/app.2b931647.css",revision:null},{url:"/shake-media-player/img/logo.39665a6e.png",revision:null},{url:"/shake-media-player/img/open-file.d6ba5b4a.svg",revision:null},{url:"/shake-media-player/index.html",revision:"013ff50a323f7691028ddf962e64d261"},{url:"/shake-media-player/js/app.e63e58cc.js",revision:null},{url:"/shake-media-player/js/chunk-vendors.ee5af723.js",revision:null},{url:"/shake-media-player/manifest.json",revision:"58e058f2b15e32153326b54b260ac638"},{url:"/shake-media-player/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
