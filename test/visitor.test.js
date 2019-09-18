const Page = require('../lib/basePage');
const visitorApp = require('../lib/visitorApp');
const config = require('../util/config');

describe('INSIDE Automation Test - Visitor test', () => {
    const selectedStage = 2;
    
    console.table(config.availableInstance);

    let cfg = config.availableInstance.filter((ins) => {
        return ins.id == selectedStage;
    });

    console.log(cfg);

    let testWebsiteUrl = cfg[0].webUrl;

    if ( testWebsiteUrl != '' ) {
        
        for(var i=1;i < 11;i++){
            
            let params = { 
                url: testWebsiteUrl,
                testChatMessage: 'testing from visitor ' + i
            }
        
             visitorApp.sendChat(Page, params);
        
        }
    }
    
})

