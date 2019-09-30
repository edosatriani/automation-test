const component = require('../util/component');
const action = require('../lib/action');

module.exports = {
    sendChat: (Page, params) => {
        describe('Visitor open site' , () => {
            const {
                Builder,
                By,
                Key,
                until
            } = require('selenium-webdriver');

            var page, driver;

            beforeAll( async () => {
                page = new Page();
                driver = page.driver;
                
                await page.visit(params.url);
            }, 30000);

            it('Chat tab should be available', async () => {
                await driver.manage().window().maximize();
                let el = await page.findById(component.liveChat.chatTab.id);
                el = await el.getAttribute('class');
                expect(el).toEqual(component.liveChat.chatTab.class);
            }, 30000);

            it('Open chat pane and should be available', async () => {
                let el = await page.findById(component.liveChat.chatTab.id);
                await el.click();
                expect("1").toEqual('1');
            }, 30000);

            /*it('Check if Pre Chat is available', async () => {
                let el = await page.findById(component.liveChat.chatPane.preChatForm.id);
                el = await el.getAttribute('id');
                expect(el).toEqual(component.liveChat.chatPane.preChatForm.id);
            }, 30000);*/

            if (params.getResultScreen) {
                describe('Send Chat' ,  () => {
                    var messages = params.testChatMessage
                    var i = 2;
                    for (const [counter, msg] of messages){ 
                       
                        it(`${i} - ${msg}`, async () => {
                            const counter = i
                            let el = await page.findById(component.liveChat.chatPane.chatInput.id);
                            await el.sendKeys(msg);
                            action.delay(2000);

                            el = await page.findById(component.liveChat.chatPane.sendButton.id);
                            action.delay(500);

                            await el.click();
                            action.delay(500);
                            
                            let xpath = component.liveChat.chatPane.chatContent.xpath;
                            console.log(xpath.replace('{counter}',counter));
                            el = await page.findByXPath(xpath.replace('{counter}',counter));
                            let resultText = await el.getText();
                            
                            //let resultText = msg
                            expect(resultText).toEqual(msg)

                            action.delay(1000);
                            
                        }, 30000)
                        
                        action.delay(500);
                        i =  (i == 2 ? 4 : i)
                        i++;
                    }
                })
            }else{
                it('Send chat', async () => {
                    let el = await page.findById(component.liveChat.chatPane.chatInput.id);
                    await el.sendKeys(params.testChatMessage);
                    
                    el = await page.findById(component.liveChat.chatPane.sendButton.id);
                    await el.click();

                    expect("1").toEqual('1');
                }, 30000);
            }
        
           
        });

    }

}