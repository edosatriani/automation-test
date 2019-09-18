const {Builder, By, until} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
// o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
// o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });

var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    // wait and find a specific element with it's id
    this.findById = async function(id) {
        return await this.driver.wait(until.elementLocated(By.id(id)), 20000, 'Looking for element')
            .then(element => {   
                return this.driver.wait(until.elementIsVisible(element), 20000);
            });
        
    };

    // wait and find a specific element with it's class name
    this.findByClassName = async function(className) {
        //await this.driver.wait(until.elementLocated(By.className(className)), 15000, 'Looking for element');
        //return await this.driver.findElement(By.className(className));
        return await this.driver.wait(until.elementLocated(By.className(className)), 20000, 'Looking for element')
            .then(element => {   
                return this.driver.wait(until.elementIsVisible(element), 20000);
            });
    };

     // wait and find a specific element with it's css
     this.findByCSS = async function(css) {
        //await this.driver.wait(until.elementLocated(By.css(css)), 15000, 'Looking for element');
        //return await this.driver.findElement(By.css(css));
        return await this.driver.wait(until.elementLocated(By.css(css)), 20000, 'Looking for element')
            .then(element => {   
                return this.driver.wait(until.elementIsVisible(element), 20000);
            });
    };

    // wait and find a specific element with it's name
    this.findByName = async function(name) {
        //await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
        //return await this.driver.findElement(By.name(name));
        return await this.driver.wait(until.elementLocated(By.name(name)), 20000, 'Looking for element')
            .then(element => {   
                return this.driver.wait(until.elementIsVisible(element), 20000);
            });
    };

    // wait and find a spesific element by xpath
    this.findByXPath = async (xpath) => {
        return await this.driver.wait(until.elementLocated(By.xpath(xpath)), 20000, 'Lookig for element')
            .then(element => {
                return this.driver.wait(until.elementIsVisible(element), 20000);
            });
    }

    // fill input web elements
    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };
};

module.exports = Page;