import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('request', request => {
    const url = request.url();
    if (url.includes('localhost:3000')) {
      console.log(`>> [REQ] ${request.method()} ${url}`);
    }
  });

  page.on('response', response => {
    const url = response.url();
    if (url.includes('localhost:3000')) {
      console.log(`<< [RES] ${response.status()} ${url}`);
      if (response.status() >= 400) {
        console.error(`❌ FAILED LOAD: ${response.status()} ${url}`);
      }
    }
  });

  page.on('pageerror', error => {
    console.error(`❌ BROWSER EXCEPTION:`, error);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`❌ BROWSER CONSOLE ERROR: ${msg.text()}`);
    } else {
      console.log(`💬 BROWSER CONSOLE: ${msg.text()}`);
    }
  });

  console.log("Navigating to http://localhost:3000/admin...");
  try {
    await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle', timeout: 20000 });
    
    // Check if we are on the login page
    if (page.url().includes('/login')) {
      console.log("Detected login page. Logging in...");
      await page.fill('input[type="email"]', 'admin@miel.fr');
      await page.fill('input[type="password"]', 'adminpassword');
      await page.click('button[type="submit"]');
      
      console.log("Waiting for navigation to dashboard...");
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 });
    }
    
    console.log(`Current URL: ${page.url()}`);
    console.log("Waiting 5s on dashboard to capture all requests...");
    await page.waitForTimeout(5000);
    
    const content = await page.content();
    console.log(`Page title: ${await page.title()}`);
    console.log(`Page content snippet (first 500 chars): ${content.substring(0, 500)}`);
  } catch (err) {
    console.error("❌ Navigation/Login failed:", err);
  }

  await browser.close();
})();
