import { chromium } from "playwright";
const browser = await chromium.launch();

const sizes = [
  { name: "ipad-landscape", w: 1024, h: 768 },
  { name: "ipad-pro", w: 1112, h: 834 },
  { name: "laptop-1280", w: 1280, h: 800 },
  { name: "desktop-1366", w: 1366, h: 768 },
  { name: "desktop-1600", w: 1600, h: 900 },
];

for (const s of sizes) {
  const context = await browser.newContext({ viewport: { width: s.w, height: s.h } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/creators", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForSelector(".creator-name", { timeout: 20000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `.tmp-shots/fix2-${s.name}.png` });
  await context.close();
}
await browser.close();
