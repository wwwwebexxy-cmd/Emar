import fs from 'node:fs';
const pages = await (await fetch('http://localhost:9224/json/list')).json();
const page = pages.find((item) => item.type === 'page' && item.url.startsWith('http://localhost:3000'));
if (!page) throw new Error('Local homepage tab not found');
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});
let id = 0;
const pending = new Map();
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});
const command = (method, params = {}) => new Promise((resolve) => {
  const requestId = ++id;
  pending.set(requestId, resolve);
  socket.send(JSON.stringify({ id: requestId, method, params }));
});
const evaluate = async (expression) => (await command('Runtime.evaluate', { expression, returnByValue: true })).result.result.value;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const captureAbout = async (width, height, mobile, output) => {
  await command('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
  await evaluate("document.querySelector('#about').scrollIntoView({block:'start'}); true");
  await wait(1100);
  const metrics = await evaluate("JSON.stringify({viewport:document.documentElement.clientWidth,documentWidth:document.documentElement.scrollWidth,section:(()=>{const r=document.querySelector('#about').getBoundingClientRect();return {width:r.width,height:r.height}})(),images:[...document.querySelectorAll('#about img')].map((e)=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))})");
  const screenshot = await command('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(output, Buffer.from(screenshot.result.data, 'base64'));
  return metrics;
};
const desktop = await captureAbout(1440, 1000, false, 'D:/Easycars-uae/tmp/emer-about-desktop-cdp.png');
const mobile = await captureAbout(390, 844, true, 'D:/Easycars-uae/tmp/emer-about-mobile-cdp.png');
console.log(JSON.stringify({ desktop, mobile }));
await command('Browser.close');
socket.close();
