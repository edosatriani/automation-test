module.exports = {
    login: { 
        email: {
            id: 'email'
        },
        password: {
            id: 'password'
        }
    },
    newMenu :{
        id: 'newMenu',
        menuTop: {
            id: 'menuTop',
            mainMenu: {
                id: 'mainMenuButton'
            },
            status: {
                id: 'statusButton',
                css: '#statusButton'
            },
            logout: {
                id: 'logoutButton',
                css: '#logoutButton'
            },
            chatList: {
                id: '',
                class: 'chatListItem'
            }
        },
        leftMenu: {
            id: 'leftMenu',
            general : {
                id: 'generalSettingsTab',
                submenu: 'sub_general',
                admin: {
                    id: 'adminSettingsMenuItem',
                    canTransferTeams: {
                        id: 'canTransferTeams'
                    },
                    canTransferChannels: {
                        id: 'canTransferChannels'
                    },
                    canTransferSkills: {
                        id: 'canTransferSkills'
                    },
                    disableCCMasking: {
                        id: 'disable_cc_masking'
                    },
                    strictNumberMasking: {
                        id: 'strictNumberMasking'
                    },
                    ccMaskExclusionsCheck: {
                        id: 'ccMaskExclusionsCheck'
                    },
                    pciCreditMasking: {
                        id: 'pciCreditMasking'
                    },
                    saveSettings: {
                        id: 'saveAdminSettings'
                    },
                    saveConfirmButton: {
                        id: 'okButton'
                    }
                },
            }
        }
    },
    floatingWindow:{
        class: 'floatingWindow',
        id: null,
        floatingWindowContent: {
            class: 'floatingWindowContent',
            id: null,
            popupContent: {
                class: 'popupContent',
                id: null,
                transferComment : {
                    id: 'txtTransferComment'
                },
                transferBy: {
                    id: 'transferBySelect'
                },
                transferList: {
                    id: 'transferList',
                    listItem: {
                        class: 'insideListItem'
                    }
                },
                confirmYes: {
                    id: 'confirmYes',
                    css: '#confirmYes'
                },
                confirmNo: {
                    id: 'confirmNo'
                }
            }
        }

    },
    addEditWindow: {
        id:'',
        windDownContainer: {
            id: 'opWindDownReasonContainer'
        },
        buttons:{
            id: 'addEditButtons',
            confirm: {
                id: '',
                class: 'confirmButton'
            },
            save: {
                id: 'popupSaveButton'
            },
            cancel: {
                id: '',
                class: 'cancelButton'
            }
        } 
    },
    userDetailWindow: {
        id: 'userDetailWindow'
    },
    liveChat:{
        chatTab: {
            id: 'inside_liveChatTab',
            css: '#inside_liveChatTab',
            class: 'inside_chat_online'
        },
        chatPane: {
            id: '',
            chatInput: {
                id: 'inside_chatInput',
                css: '#inside_chatInput'
            },
            sendButton: {
                id: 'inside_chatSendButton',
                css: '#inside_chatSendButton'
            },
            preChatForm: {
                id: 'inside_prechatForm',
                css: '#inside_prechatForm'
            },
            chatContent: {
                xpath: "//div[@id='inside_chatWindow']/div/div/div[{counter}]"
            }
        }
    },
    chatBox :{
        chatInput: {
            id: 'userChatInput'
        }
    },
    chatControls: {
        endChat: {
            id: 'endChat'
        },
        escalateChat: {
            id: 'escalateChatButton'
        },
        beRightBack: {
            id: 'beRightBackButton'
        },
        transferChat: {
            id: 'transferChatButton'
        },
        takeChat: {
            id: 'takeChatButton'
        },
        createNewContact: {
            id: 'createNewContact'
        },
        forwardTicket: {
            id: 'forwardTicketButton'
        },
        lead: {
            id: 'leadButton'
        },
        createCase: {
            id: 'createCaseButton'
        },
        reopenInside: {
            id: 'reopenInsideTicket'
        },
        postpone: {
            id: 'postponeButton'
        },
        closeChatPane: {
            id: 'closeChatPaneButton'
        },
        chatRight: {
            videoChat: {
                id: 'videoChatButton'
            },
            createInsideTicket: {
                id: 'createInsideTicket'
            },
            spam: {
                id: 'spamButton'
            },
            categorise: { // Disposition
                id: 'categoriseButton'
            }
        }
    }

};