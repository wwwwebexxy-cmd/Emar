import fs from 'node:fs';

const pages = await (await fetch('http://localhost:9224/json/list')).json();
const page = pages.find((item) => item.type === 'page' && item.url.startsWith('http://localhost:3000'));
if (!page) throw new Error('Local homepage tab not found');
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});
let nextId = 0;
const pending = new Map();
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});
const command = (method, params = {}) => new Promise((resolve) => {
  const id = ++nextId;
  pending.set(id, resolve);
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const response = await command('Runtime.evaluate', { expression, returnByValue: true });
  return response.result.result.value;
};
await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await evaluate("document.querySelector('.support-journey').scrollIntoView({block:'start'}); true");
await new Promise((resolve) => setTimeout(resolve, 1100));
const layout = await evaluate("JSON.stringify({viewport:document.documentElement.clientWidth,documentWidth:document.documentElement.scrollWidth,section:(()=>{const r=document.querySelector('.support-journey').getBoundingClientRect();return {x:r.x,width:r.width,height:r.height}})(),steps:[...document.querySelectorAll('.support-step')].map((e)=>{const r=e.getBoundingClientRect();return {x:r.x,width:r.width,height:r.height}})})");
const shot = await command('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync('D:/Easycars-uae/tmp/emer-desktop-support-cdp.png', Buffer.from(shot.result.data, 'base64'));
await evaluate("document.querySelectorAll('.hero-slide-control')[1].click(); true");
await new Promise((resolve) => setTimeout(resolve, 400));
const selected = await evaluate("JSON.stringify({active:document.querySelectorAll('.hero-slide-control')[1].getAttribute('aria-pressed'),caption:document.querySelector('.hero-caption-copy').textContent,photo:document.querySelector('.hero-photo-laundry .is-active').getAttribute('src')})");
await new Promise((resolve) => setTimeout(resolve, 6600));
const rotated = await evaluate("JSON.stringify({first:document.querySelectorAll('.hero-slide-control')[0].getAttribute('aria-pressed'),caption:document.querySelector('.hero-caption-copy').textContent})");
console.log(JSON.stringify({ layout, selected, rotated }));
await command('Browser.close');
socket.close();

