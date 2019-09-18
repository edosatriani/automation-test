const Page = require('../lib/basePage');
const action = require('../lib/action');
const config = require('../util/config');

describe('INSIDE Automation Test - Action Module', () => {
    const selectedStage = 2;
    const windDownEnable = false;
    
    console.table(config.availableInstance);

    let cfg = config.availableInstance.filter((ins) => {
        return ins.id == selectedStage;
    });

    console.log(cfg);

    let stageUrl = cfg[0].instanceUrl;
    let testWebsiteUrl = cfg[0].webUrl;

    var loginResult = [];

    if ( stageUrl != '' ) {
        var counter = 0;
        var page, driver;
        config.operator.forEach(op => {
            
            var params = { 
                url: stageUrl,
                email: op.email,
                password: op.password,
                sysAdmin: op.sysAdmin,
                status: 1
            }

            describe(`Operator ${op.email}` , () => {

                beforeAll( async () => {
                    page = new Page();
                    driver = page.driver;
                    await page.visit(stageUrl);
                }, 30000);
    
                describe('Run Scenario', () => {

                    it('Automatically logged in', async () => {
                        await action.operator.login(page, params)
                        expect("1").toEqual('1')
                    }, 30000);
                    
                    it(`Change Operator avaliability status into ${params.status == 1 ? 'available':'not available'}`, async () => {
                        let returnEl = await action.operator.availableForChat(page, params)
                        expect(returnEl).toContain('active');
                    }, 30000);

                    it('Open Settings Menu', async () => {
                        driver.manage().window().maximize();
                        driver.executeScript('$("stageback").hide()');
                        let returnEl = await action.topMenu.toggleSettings(page, false)
                        expect(returnEl).toContain('display: block;')
                    }, 30000);

                    if (windDownEnable){
                        it('Wind Down', async () => {
                            driver.manage().window().maximize();
                            let returnEl = await action.operator.windDown(page, driver)
                            expect(returnEl).not.toContain('active');
                        }, 30000);
                    }else{
                        it('Change Operator avaliability status into not available', async () => {
                            driver.manage().window().maximize();
                            let returnEl = await action.operator.notAvailableForChat(page, false)
                            if (returnEl.includes('active')){
                                returnEl = await action.operator.notAvailableForChat(page, true)
                            } else{
                                expect(returnEl).not.toContain('active');
                            }
                           
                        }, 30000);
                    }

                    it('Close Settings Menu', async () => {
                        driver.manage().window().maximize();
                        driver.executeScript('$("stageback").hide()');
                        let returnEl = await action.topMenu.toggleSettings(page, false)
                        if (returnEl.includes('display: block;')){
                            returnEl = await action.topMenu.toggleSettings(page, true)
                        } else{
                            expect(returnEl).toContain('display: none;')
                        }
                        
                    }, 30000);
                    
                   /* it('Log out', async () => {
                        driver.executeScript('$("stageback").hide()');
                        let returnEl = await action.operator.notAvailableForChat(page, false)
                        if (returnEl.includes('active')){
                            returnEl = await action.operator.notAvailableForChat(page, true)
                            await action.operator.logout(page, params)
                            expect("1").toEqual('1')
                        } else{
                            await action.operator.logout(page, params)
                            expect("1").toEqual('1')
                        }
                        
                    }, 30000);*/
                    
                });
            })
            
            counter++;
        });  

    }
    
})

