const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log('Bot Conversor');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    
    const moedaBase = readlineSync.question('Informe a moeda base: ') || 'dolar';
    const moedaFinal = readlineSync.question('Informe a moeda final: ') || 'real';
    
    const url = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome.0.0l8.2086j1j7&sourceid=chrome&ie=UTF-8`;
    await page.goto(url);
    
    const resultado = await page.evaluate(() => {
        return document.querySelector('.DFlfde.SwHCTb').innerHTML;
    });

    console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`);

    await page.screenshot({path: "index.png", fullPage: true});

    await browser.close();
})();