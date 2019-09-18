const Page = require('../lib/basePage');
const loginApp = require('../lib/loginApp');
const visitorApp = require('../lib/visitorApp');
const config = require('../util/config');


describe('INSIDE Automation Test - Transfer Matrix', () => {

    let selectedStage = 2;
    
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
        config.operator.forEach(op => {
            let params = { 
                url: stageUrl,
                email: op.email,
                password: op.password,
                sysAdmin: op.sysAdmin
            }

            loginResult[counter] = loginApp.operatorLogin(Page, params);
            counter++;
        });  

        let params = { 
            url: testWebsiteUrl,
            testChatMessage: 'testing toggle matrix'
        }

        visitorApp.sendChat(Page, params);

        loginResult.forEach(lr => {
            
        });

    }
    
    
    
})