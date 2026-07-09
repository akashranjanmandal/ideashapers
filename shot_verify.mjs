import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/creators", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForSelector(".creator-name", { timeout: 20000 });
await page.waitForTimeout(2500);

// scroll to 11th section (index 10)
await page.evaluate(() => {
  const sections = document.querySelectorAll('.creator-section');
  sections[10]?.scrollIntoView({ behavior: 'instant' });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: ".tmp-shots/verify-11th.png" });
await browser.close();
