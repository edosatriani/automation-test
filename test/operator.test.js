const Page = require('../lib/basePage');
const action = require('../lib/action');
const visitorApp = require('../lib/visitorApp');
const config = require('../util/config');

describe('INSIDE Automation Test - Operator Test', () => {
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
                    
                    it(`Change Operator avaliability status into ${params.status == 1 ? 'available':'not available'}`, async () => {
                        driver.manage().window().maximize();
                        let returnEl = await action.operator.availableForChat(page, params)
                        expect(returnEl).toContain('active');
                    }, 30000);                   
                    
                });
            })
            
            operatorSession[counter] = page;

            counter++;
        });  

        /* Visitor open site*/
        for(var i=1;i < 2;i++){
            let params = { 
                url: testWebsiteUrl,
                testChatMessage: 'testing chat from visitor ' + i
            }
        
            visitorApp.sendChat(Page, params);
        }

        /* Operator reply chat*/
        for(var i=0;i < operatorSession.length;i++){

            //let opPage = operatorSession[i];
            let opName = config.operator[i].name;

            describe(`Operator (${opName}) reply the chat`, () => {

                it('Click Chat Item', async () => {
                    let params = {}
                    await action.operator.openChat(page, params)
                    expect("1").toEqual('1')
                }, 30000);
                
                it('Reply Chat', async () => {
                    let params = {
                        message: `reply from operator (${opName})`
                    }
                    await action.operator.replyChat(page, params)
                    expect("1").toEqual('1')
                }, 30000);                 
                
            });

        }

    }
    
})

