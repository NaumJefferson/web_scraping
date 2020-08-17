require('dotenv/config');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://github.com/login');

    await page.screenshot({path: 'antes.png', fullPage: true});

    await page.waitFor('#login_field');
    await page.type('#login_field', process.env.LOGIN_USER, {delay: 100});

    await page.waitFor('#password');
    await page.type('#password', process.env.LOGIN_PASSWORD, {delay: 100});

    await page.waitFor('input[type=submit]');
    await page.click('input[type=submit]');
    await page.waitForNavigation({waitUntil: "networkidle0"});

    const url = await page.evaluate(() => {
        return window.location.href;
    });

    console.log(`Url: ${url}`);

    await page.screenshot({path: 'depois.png', fullPage: true});

    await browser.close();

})();