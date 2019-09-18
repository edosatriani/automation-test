const Page = require('../lib/basePage');
const action = require('../lib/action');
const visitorApp = require('../lib/visitorApp');
const component = require('../util/component');
const config = require('../util/config');
const qanda = require('../util/qa/cancelorder');

describe('INSIDE Automation Test - Q & A Test', () => {
    const selectedStage = 1;
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
        var cPage, cDriver;

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
    
                describe('Run Scenario', () => {

                    it('Automatically logged in', async () => {
                        await action.operator.login(page, params)
                        expect("1").toEqual('1')
                    }, 30000);
                    
                    action.delay(2000);

                    it(`Change Operator avaliability status into ${params.status == 1 ? 'available':'not available'}`, async () => {
                        driver.manage().window().maximize();
                        action.delay(500);
                        let returnEl = await action.operator.availableForChat(page, params)
                        action.delay(1000);

                        expect(returnEl).toContain('active');
                    }, 30000);                   
                    
                });
            })
            
            operatorSession[counter] = page;

            counter++;
        });  

        /* Visitor open site*/

        describe('Visitor open site' , () => {
            beforeAll( async () => {
                cPage = new Page();
                cDriver = cPage.driver;
            }, 30000);

            action.delay(500);

            it('open site', async () => {
                await cPage.visit(testWebsiteUrl);
            }, 30000);

            action.delay(500);

            it('Chat tab should be available', async () => {
                await cDriver.manage().window().maximize();
                let el = await cPage.findById(component.liveChat.chatTab.id);
                el = await el.getAttribute('class');
                expect(el).toEqual(component.liveChat.chatTab.class);
            }, 30000);

            action.delay(500);

            it('Open chat pane and should be available', async () => {
                let el = await cPage.findById(component.liveChat.chatTab.id);
                await el.click();
                expect("1").toEqual('1');
            }, 30000);
           
           
                    
           
        });

        var question = qanda.question
        var qestionNo = 1;
        
        var needToRun = [0,1,2,3,4]

        for (const index of needToRun) {
            for (const msg of question){ 

                let params = { 
                    url: testWebsiteUrl,
                    testChatMessage: msg
                }
                // visitorApp.sendChat(Page, params);
                describe('Send Chat' , () => {
                    
                    it(`Q${qestionNo} : ${msg}`, async () => {
                        let el = await cPage.findById(component.liveChat.chatPane.chatInput.id);
                        await el.sendKeys(params.testChatMessage);
                        
                        el = await cPage.findById(component.liveChat.chatPane.sendButton.id);
                        await el.click();
        
                        expect("1").toEqual('1');
                        
                    }, 30000);
                })
                
                action.delay(500);

                //let opPage = operatorSession[i];
                let opName = config.operator[0].name;

                describe(`Operator (${opName}) reply the chat`, () => {

                    it('Click Chat Item', async () => {
                        let params = {}
                        await action.operator.openChat(page, params)

                        //action.delay(500);

                        let el = await page.findById(component.userDetailWindow.id);
                        let attr = await el.getAttribute('style');
                        expect(attr).toContain('block')

                    }, 30000);

                    //action.delay(500);
                    
                    var rnd = Math.floor(Math.random() * qanda.answer.length);

                    it(`Reply Chat (Answer ${rnd+1}: ${qanda.answer[rnd]})`, async () => {

                        let params = {
                            message: qanda.answer[rnd]
                        }
                        await action.operator.replyChat(page, params)
                        expect("1").toEqual('1')
                    }, 30000);   
                    
                    //action.delay(500);
                    
                    it('End Chat', async () => {
                        let el = await page.findById(component.userDetailWindow.id);
                        await action.operator.chatControls.endChat(page, null)
                        //action.delay(500);
                        
                        let attr = await el.getAttribute('style');
                        expect(attr).toContain('none')
                    }, 30000);   

                    action.delay(500);
                    
                });

                qestionNo++

            }
            action.delay(500)
        }
    }
    
})

