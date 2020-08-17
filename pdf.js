const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://github.com/puppeteer/puppeteer', {waitUntil: 'networkidle2'});

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  await page.evaluate(() => console.log(`url is ${window.location.href}`));

  console.log('Dimensions:', dimensions);
  await page.pdf({path: 'print.pdf', format: 'A4'});

  await browser.close();
})();