const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

(async function testLogin() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('headless'))
        .build();

    try {
        await driver.get('http://localhost:3000/Bejelentkezes');

        await driver.findElement(By.id('loginNev')).sendKeys('Dawe');
        await driver.findElement(By.id('password')).sendKeys('cigany');
        await driver.findElement(By.className('submit-btn')).click(); 

        console.log('\x1b[32mBejelentkezési teszt sikeres\x1b[0m');
    } catch (err) {
        console.error('Teszt hiba:', err.message);
    } finally {
        await driver.quit();
    }
})();