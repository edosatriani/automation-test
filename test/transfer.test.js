const Page = require('../lib/basePage');
const action = require('../lib/action');
const visitorApp = require('../lib/visitorApp');
const config = require('../util/config');

describe('INSIDE Automation Test - Transfer Test', () => {
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
    var operatorPage;

    if ( stageUrl != '' ) {
        var counter = 0;
        var page;
        var driver;

        /* enable chat for all operator */
        config.operator.forEach(op => {
            
            var params = { 
                url: stageUrl,
                email: op.email,
                password: op.password,
                sysAdmin: op.sysAdmin,
                status: 1
            }

            beforeAll( async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(stageUrl);
                operatorSession.push({ opPage: page});
            }, 30000);

            describe(`Operator ${op.email}` , () => {

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

        var opName = config.operator[0].name;

        describe(`Operator (${opName}) transfer the chat`, () => {

            
            it('Click Chat Item', async () => {
                let params = {}
                await action.operator.openChat(page, params)
                expect("1").toEqual('1')
            }, 30000);
            
            describe('Transfer Scenario', () => {

                it('Click transfer button', async () => {
                    let params = {}
                    await action.operator.chatControls.transferChat.open(page, params)
                    expect("1").toEqual('1')
                }, 30000);

                it('Select other operator', async () => {
                    let params = {}
                    await action.operator.chatControls.transferChat.selectOperator(page, params)
                    expect("1").toEqual('1')
                }, 30000);

                it('Submit transfer', async () => {
                    let params = {}
                    await action.operator.chatControls.transferChat.open(page, params)
                    expect("1").toEqual('1')
                }, 30000);
 
            });                 
            
        });

    }
    
})

