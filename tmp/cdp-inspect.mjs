import fs from 'node:fs';

const pages = await (await fetch('http://localhost:9224/json/list')).json();
const page = pages.find((item) => item.type === 'page' && item.url.startsWith('http://localhost:3000'));
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

await command('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await new Promise((resolve) => setTimeout(resolve, 500));

const inspection = await command('Runtime.evaluate', {
  expression: `(() => {
    const read = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        display: style.display,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        fontSize: style.fontSize,
      };
    };
    return JSON.stringify({
      viewport: {
        innerWidth,
        clientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        devicePixelRatio,
      },
      nav: read('.nav-inner'),
      navToggle: read('.nav-toggle'),
      hero: read('.hero-section'),
      heroCopy: read('.hero-copy'),
      heroInner: read('.hero-copy-inner'),
      heroTitle: read('.hero-copy h1'),
      heroActions: read('.hero-actions'),
      heroButton: read('.hero-actions .button'),
      serviceCard: read('.service-type-card'),
    });
  })()`,
  returnByValue: true,
});
console.log(inspection.result.result.value);

const screenshot = await command('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync('D:/Easycars-uae/tmp/emer-mobile-cdp.png', Buffer.from(screenshot.result.data, 'base64'));
await command('Runtime.evaluate', {
  expression: "document.querySelector('#services').scrollIntoView({ block: 'start' }); true",
  returnByValue: true,
});
await new Promise((resolve) => setTimeout(resolve, 1100));
const serviceScreenshot = await command('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync('D:/Easycars-uae/tmp/emer-mobile-services-cdp.png', Buffer.from(serviceScreenshot.result.data, 'base64'));
await command('Browser.close');
socket.close();
