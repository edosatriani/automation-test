const component = require('../util/component');
const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');


module.exports = {
    delay: (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    },
    hitBody: async (page, params) => {
        let el = await page.findByXPath(component.body.xpath)
        el.click()
        return '1'
    },
    operator: {
        login: async (page, params) => {
            let el = await page.findById(component.login.email.id)
            el.sendKeys(params.email)

            el = await page.findById(component.login.password.id)
            el.sendKeys(params.password, Key.RETURN)       
        },
        logout: async (page, params) => {
            let el = await page.findByCSS(component.newMenu.menuTop.logout.css)
            el.click()

            el = await page.findByCSS(component.floatingWindow.floatingWindowContent.popupContent.confirmYes.css);
            el.click();

            el = await page.findById(component.login.email.id)
  
        },
        availableForChat: async (page, params) => {
            let el = await page.findByCSS(component.newMenu.menuTop.status.css)
            el.click()
            
            el = await page.findById(component.floatingWindow.floatingWindowContent.popupContent.confirmYes.id)
            await el.click()

            el = await page.findByCSS(component.newMenu.menuTop.status.css)
            let returnEl = await el.getAttribute('class');

            return returnEl;
        },
        notAvailableForChat: async (page, repeat) => {
            if (!repeat){
                let el = await page.findByCSS(component.newMenu.menuTop.status.css)
                await el.click()
            }

            let el = await page.findByCSS(component.newMenu.menuTop.status.css)
            let returnEl = await el.getAttribute('class');

            return returnEl;
        },
        windDown: async (page, params) => {
            let el = await page.findByCSS(component.newMenu.menuTop.status.css)
            el.click()

            el = await page.findByClassName(component.addEditWindow.buttons.confirm.class)
            el.click() // update into database need to put await

            el = await page.findByCSS(component.newMenu.menuTop.status.css)
            let returnEl = await el.getAttribute('class');

            return returnEl;
        },
        openChat: async (page, params) => {
            el = await page.findByClassName(component.newMenu.menuTop.chatList.class)
            el.click()
        },
        replyChat: async (page, params) => {
            el = await page.findById(component.chatBox.chatInput.id)
            el.sendKeys(params.message, Key.RETURN);
        },
        chatControls: {
            endChat: async (page, params) => {
                el = await page.findById(component.chatControls.endChat.id)
                el.click()
            },
            transferChat: {
                open: async (page, params) => {
                    el = await page.findById(component.chatControls.transferChat.id)
                    el.click()
                },
                setFilter: async (page, params) => {
                    el = await page.findById(component.floatingWindow.floatingWindowContent.popupContent.transferBy.id)
                    el.sendKeys(params.select)
                },
                setComment: async (page, params) => {
                    el = await page.findById(component.floatingWindow.floatingWindowContent.popupContent.transferComment.id)
                    el.sendKeys(params.message)
                },
                selectOperator: async (page, params) => {
                    el = await page.findByClassName(component.floatingWindow.floatingWindowContent.popupContent.transferList.listItem.class)
                    el.click()
                },
                submit: async (page, params) => {
                    el = await page.findById(component.addEditWindow.buttons.save.id)
                    el.click()
                } 
            },
            beRightBack: async (page, params) => {
                el = await page.findById(component.chatControls.beRightBack.id)
                el.click()
            },
            takeChat: async (page, params) => {
                el = await page.findById(component.chatControls.takeChat.id)
                el.click()
            },
            createNewContact: async (page, params) => {
                el = await page.findById(component.chatControls.createNewContact.id)
                el.click()
            },
            forwardTicket:  async (page, params) => {
                el = await page.findById(component.chatControls.forwardTicket.id)
                el.click()
            },
            lead: async (page, params) => {
                el = await page.findById(component.chatControls.lead.id)
                el.click()
            },
            createCase: async (page, params) => {
                el = await page.findById(component.chatControls.createCase.id)
                el.click()
            },
            reOpenInside: async (page, params) => {
                el = await page.findById(component.chatControls.reopenInsideTicket.id)
                el.click()
            },
            postPone: async (page, params) => {
                el = await page.findById(component.chatControls.postpone.id)
                el.click()
            },
            closeChatPane: async (page, params) => {
                el = await page.findById(component.chatControls.closeChatPane.id)
                el.click()
            },
            disposition: async (page, params) => {
                el = await page.findById(component.chatControls.disposition.id)
                el.click()
            }
        }

    },
    topMenu: {
        toggleSettings: async (page, repeat) => {
            if (!repeat){
                let elem = await page.findByXPath(component.newMenu.menuTop.mainMenu.xpath);
                elem.click();
            }            
            el = await page.findById(component.newMenu.leftMenu.id);
            return  await el.getAttribute('style');
        },
        toggleSettingsExecute: async (driver) => {
            await driver.executeScript('$("#' + component.newMenu.menuTop.mainMenu.id +'").trigger("click")');
        }
    },
    settings:{
        general: {
            open: async (page, params) => {
                el = await page.findById(component.newMenu.leftMenu.general.id);
                el.click();   
                return  await el.getAttribute('submenu');             
            },
            admin: {
                open : async (page, params) => {
                    el = await page.findById(component.newMenu.leftMenu.general.admin.id);
                    el.click();
                    return  await el.getAttribute('content');  
                },
                disableCCMasking : async (page,disable) => {
                    
                    el = await page.findById(component.newMenu.leftMenu.general.admin.disableCCMasking.id);
                    let attr = await el.getAttribute('class')
                    if (attr.includes('selected')){
                        if (!disable) el.click();
                    }else{
                        if (disable) el.click();
                    }
                    attr = await el.getAttribute('class')
                    return attr;
                },
                strictNumberMasking : async (page,enable) => {
                    
                    el = await page.findById(component.newMenu.leftMenu.general.admin.strictNumberMasking.id);
                    let attr = await el.getAttribute('class')
                    if (attr.includes('selected')){
                        if (!enable) await el.click();
                    }else{
                        if (enable) await el.click();
                    }
                    attr = await el.getAttribute('class')
                    return attr;
                },
                ccMaskExclusionsCheck : async (page,enable) => {
                    
                    el = await page.findById(component.newMenu.leftMenu.general.admin.ccMaskExclusionsCheck.id);
                    let attr = await el.getAttribute('class')
                    if (attr.includes('selected')){
                        if (!enable) el.click();
                    }else{
                        if (enable) el.click();
                    }
                    attr = await el.getAttribute('class')
                    return attr;
                },
                pciCreditMasking : async (page,enable) => {
                    
                    el = await page.findById(component.newMenu.leftMenu.general.admin.pciCreditMasking.id);
                    let attr = await el.getAttribute('class')
                    if (attr.includes('selected')){
                        if (!enable) await el.click();
                    }else{
                        if (enable) await el.click();
                    }
                    attr = await el.getAttribute('class')
                    return attr;
                }, 
                saveSettings : async (page, action) => {
                    el = await page.findById(component.newMenu.leftMenu.general.admin.saveSettings.id);
                    el.click()
                    action.delay(500);
                    
                    var elb = await page.findById(component.newMenu.leftMenu.general.admin.saveConfirmButton.id);
                    action.delay(500);

                    let attr = await elb.getAttribute('id')
                    elb.click()
                    return attr
                }

            }
        }
    }
}