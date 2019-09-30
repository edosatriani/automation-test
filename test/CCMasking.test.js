const Page = require('../lib/basePage');
const action = require('../lib/action');
const visitorApp = require('../lib/visitorApp');
const config = require('../util/config');
const component = require('../util/component');

describe('INSIDE Automation Test - CC Masking Automation Test', () => {
    const selectedStage = 2;
    const windDownEnable = false;
    
    console.table(config.availableInstance);

    let cfg = config.availableInstance.filter((ins) => {
        return ins.id == selectedStage;
    });

    console.log(cfg);

    let stageUrl = cfg[0].instanceUrl;
    let testWebsiteUrl = cfg[0].webUrl;

    var operatorSession = [];

    if ( stageUrl != '' ) {
        var counter = 0;
        var page, driver;

        const sampleData = [
            "A Valid CC 5555555555554444", 
            "B Invalid CC 5555555555554449",
            "C 5555.5555.5555.4444",
            "D 5555 5555 5555 4444",
            "E 5555-5555-5555-4444",
            "F 5555",
            "G 555",
            "H 13579 5555 5555 5555 4444",
            "I 5555 5555 5555 4444, 1",
            "J [E 5555-5555-5555-4444]"
        ];

        /* enable chat for all operator */
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
    
                describe('Login', () => {
                    it('Automatically logged in', async () => {
                        await action.operator.login(page, params)
                        expect("1").toEqual('1')
                    }, 30000);
                })

                describe('Scenario I', () => {
                    action.delay(500);

                    it('Open Settings Menu', async () => {
                        driver.manage().window().maximize();
                        //driver.executeScript('$("stageback").hide()');
                        let returnEl = await action.topMenu.toggleSettings(page, false)
                        expect(returnEl).toContain('display: block;')
                    }, 30000);

                    action.delay(500);

                    it('Open General Menu', async() => {
                        let returnId =  await action.settings.general.open(page, null)
                        console.log(returnId);
                        let el = await page.findById(returnId)
                        let css = await el.getAttribute('style')
                        expect(css).toContain('display: block;')
                    }, 30000);

                    action.delay(500);

                    it('Open Admin Menu', async() => {
                        let returnId =  await action.settings.general.admin.open(page, null)
                        console.log(returnId);
                        let el = await page.findById(returnId)
                        let css = await el.getAttribute('style')
                        expect(css).not.toContain('display: none;')
                    }, 30000);  

                    action.delay(500);
                    
                    it('Disable CC Masking', async() => {
                        let returnVal = await action.settings.general.admin.disableCCMasking(page, true)
                        expect(returnVal).toContain('selected')
                    }, 30000); 

                    action.delay(500);

                    /*it('Enable CC Masking', async() => {
                        let returnVal = await action.settings.general.admin.disableCCMasking(page, false)
                        expect(returnVal).not.toContain('selected')
                    }, 30000);   */      

                    /* Only one option active for both Strict Masking  All CC Number and PCI DSS */
                    it('Disable Strict Masking All CC Number', async() => {
                        let returnVal = await action.settings.general.admin.strictNumberMasking(page, false)
                        expect(returnVal).not.toContain('selected')
                    }, 30000);  

                    action.delay(500);

                    it('Disable PCI DSS for CC Masking', async() => {
                        let returnVal = await action.settings.general.admin.pciCreditMasking(page, false)
                        expect(returnVal).not.toContain('selected')
                    }, 30000);  

                    action.delay(500);

                    it('Disable CC Mask Exclusion', async() => {
                        let returnVal = await action.settings.general.admin.ccMaskExclusionsCheck(page, false)
                        expect(returnVal).not.toContain('selected')
                    }, 30000); 
                    
                    action.delay(500);

                    it('Save Admin Settings', async () => {
                        let returnVal = await action.settings.general.admin.saveSettings(page, action);
                        action.delay(500);
                        expect(returnVal).toEqual(component.newMenu.leftMenu.general.admin.saveConfirmButton.id)
                    }, 30000);

                    action.delay(500);

                    it('Clear overlay', async ()=> {
                        let returnVal = await action.hitBody(page, action);
                        action.delay(500);
                        expect(returnVal).toEqual('1')
                    }, 30000)

                    action.delay(500);

                    it('Close Settings Menu', async () => {
                        driver.manage().window().maximize();
                        driver.executeScript('$("#stageBack").hide()');
                        action.delay(500);

                        await action.topMenu.toggleSettingsExecute(driver);
                        action.delay(2000);

                        let returnEl = await action.topMenu.toggleSettings(page, true)
                        action.delay(500)
                        expect(returnEl).toContain('display: none;')
                        
                    }, 30000);

                    action.delay(500);

                    it(`Change Operator avaliability status into ${params.status == 1 ? 'available':'not available'}`, async () => {
                        driver.manage().window().maximize();
                        driver.executeScript('$("#stageBack").hide()');
                        
                        action.delay(500);
                        let returnEl = await action.operator.availableForChat(page, params)
                        action.delay(1000);
                        expect(returnEl).toContain('active');
                    }, 30000);  

                    action.delay(500);

                    let vParams = { 
                        url: testWebsiteUrl,
                        getResultScreen: true,
                        testChatMessage: sampleData
                    }

                   // visitorApp.sendChat(Page, vParams);

                })
            })
            
            operatorSession[counter] = page;

            counter++;
        });  

    }
    
})

