const fs = require('fs');
describe('test inside operator page', () => {

    const {
        Builder,
        By,
        Key,
        until
    } = require('selenium-webdriver');
    var driver;

    beforeEach( async () => {
        driver = new Builder()
            .forBrowser('chrome')
            .build();
    });

    afterEach(() => {
      // driver.quit();
    });

    it('should open INSIDE operator page and automatically logged in', async () => {

        // Init the login page
        await driver.get('https://stage2-live.inside-graph.com/login');

        // get Email and Password element
        var elEmail = await driver.findElement(By.id('email'));
        var elPassword = await driver.findElement(By.id('password'));

        // set email and password then submit 
        await elEmail.sendKeys("petra.hanafiah@powerfront.com");
        await elPassword.sendKeys("qwerty55", Key.RETURN);

        // wait until operator dashboard page loaded
        await driver.wait(until.elementLocated(By.id('newMenu')), 5000);
        //expect("Login action is fine").anything();

        // display enable operator status dialog
        var elStatusButton = await driver.findElement(By.id('statusButton'));
        await elStatusButton.click();
        //expect("Display enable operatos status dialog").anything();

         // enable operator status become available
        var elConfirm = await driver.findElement(By.id('confirmYes'));
        await elConfirm.click();
        //expect("enable operatus status").anything();

        driver
            .getTitle()
            .then(title => {
                expect(title).toEqual('INSIDE stage2');
            });
    },30000);

    

});