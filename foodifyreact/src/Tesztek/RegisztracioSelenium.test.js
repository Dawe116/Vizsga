const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

(async function regisztracioTeszt() {
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('headless'))
        .build();

    try {
        await driver.get('http://localhost:3000/regisztracio');

        await driver.findElement(By.id('name')).sendKeys('Teszt Elek');
        await driver.findElement(By.id('loginNev')).sendKeys('tesztelek');
        await driver.findElement(By.id('email')).sendKeys('teszt@pelda.hu');
        await driver.findElement(By.id('password')).sendKeys('Asdf1234');
        await driver.findElement(By.id('confirmPassword')).sendKeys('Asdf1234');

        await driver.findElement(By.className('submit-btn')).click();

        console.log('\x1b[32mRegisztrációs teszt sikeres\x1b[0m');
    } catch (err) {
        console.error('Teszt hiba:', err.message);
    } finally {
        await driver.quit();
    }
})();