const component = require('../util/component');

module.exports = {
    operatorLogin: (Page, params) => {
        var returnValue = {};

        describe('Operator Login ' + params.email , () => {
            const {
                Builder,
                By,
                Key,
                until
            } = require('selenium-webdriver');

            var page, driver, el, elAttr;

            beforeAll( async () => {
                page = new Page();
                driver = page.driver;
                
                await page.visit(params.url);
            }, 30000);


            it('Should open INSIDE operator page', async () => {

                // Init the login page
                //await driver.get(params.url);
                driver.manage().window().maximize();
                expect("1").toEqual('1');
        
               
            }, 30000);
        
            it('Automatically logged in', async () => {
        
                // get Email and Password element
                var elEmail = await page.findById(component.login.email.id);
                var elPassword = await page.findById(component.login.password.id);
        
                // set email and password then submit 
                await elEmail.sendKeys(params.email);
                await elPassword.sendKeys(params.password, Key.RETURN);
        
                // wait until operator dashboard page loaded
                await driver.wait(until.elementLocated(By.id(component.newMenu.id)), 20000);
                expect("1").toEqual('1');
        
            }, 30000);

            it('Enable operator Status', async () => {
                
                // display enable operator status dialog
                var elStatusButton = await page.findById(component.newMenu.menuTop.status.id);
                await elStatusButton.click();
                
                // enable operator status become available
                el = await page.findById(component.floatingWindow.floatingWindowContent.popupContent.confirmYes.id);
                await el.click();
        
                var elStatusButtonClass = await elStatusButton.getAttribute('class');
                //console.log(elStatusButtonClass);
                expect(elStatusButtonClass).toContain('active');
        
        
            }, 30000);
        
            if ( params.sysAdmin ) {
            
                it('Open Settings Menu', async () => {
                    driver.manage().window().maximize();
                    var elem = await page.findById(component.newMenu.menuTop.mainMenu.id);
                    await elem.click();
            
                    el = await page.findById(component.newMenu.leftMenu.id);
                    elAttr = await el.getAttribute('style');
                    expect(elAttr).toContain('display: block;');
            
                }, 30000);
                
                it('Click menu settings > general', async () => {
                    el = await page.findById(component.newMenu.leftMenu.general.id);
                    await el.click();
            
                    elAttr = await el.getAttribute('class');
                    expect(elAttr).toContain('selected');
            
                }, 30000);
            
                it('Click menu settings > general > admin', async () => {
                    el = await page.findById(component.newMenu.leftMenu.general.admin.id);
                    await el.click();
            
                    elAttr = await el.getAttribute('class');
                    expect(elAttr).toContain('selected');
            
                }, 30000);
            
                it('Can transfer to Other Teams setting is ON', async () => {
                    el = await page.findById(component.newMenu.leftMenu.general.admin.canTransferTeams.id);
                    
                    elAttr = await el.getAttribute('class');
                    expect(elAttr).toContain('selected');
            
                }, 30000);
            
                it('Can transfer to Other Channels setting is ON', async () => {
                    el = await page.findById(component.newMenu.leftMenu.general.admin.canTransferChannels.id);
                    
                    elAttr = await el.getAttribute('class');
                    expect(elAttr).toContain('selected');
            
                }, 30000);
            
                it('Can transfer to Other Skills setting is ON', async () => {
                    el = await page.findById(component.newMenu.leftMenu.general.admin.canTransferSkills.id);
                    
                    elAttr = await el.getAttribute('class');
                    expect(elAttr).toContain('selected');
            
                }, 30000);
            }

            returnValue = {
                page: page,
                driver: driver
            }
        
        })
        
        return returnValue;
    }
}