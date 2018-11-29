(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/scenes/Login.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '793f8Lb6exNAqs8SOh7jcxO', 'Login', __filename);
// scripts/scenes/Login.js

'use strict';

var userService = require('userService');
cc.Class({
    extends: cc.Component,

    properties: {
        loginlayout: {
            default: null,
            type: cc.Node
        },
        error: {
            default: null,
            type: cc.Label
        },
        username: {
            default: null,
            type: cc.EditBox
        },
        password: {
            default: null,
            type: cc.EditBox
        },
        status: {
            default: null,
            type: cc.Toggle
        },
        loginbtn: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:
    initLogin: function initLogin() {
        var login = cc.find('loginlayout', this.node),
            header = cc.find('header', login),
            error = cc.find('error', login),
            username = cc.find('username', login),
            password = cc.find('password', login),
            name = cc.find('name', username),
            pasd = cc.find('pasd', password),
            nameInput = cc.find('nameeditbox', username),
            pasdInput = cc.find('passwordeditbox', password),
            agreement = cc.find('agreement', login),
            status = cc.find('agreestatus', agreement),
            agreedetail = cc.find('agreedetail', agreement),
            buttons = cc.find('buttons', login),
            loginben = cc.find('loginbtn', buttons);
        login.width = this.node.width > 900 ? Math.floor(this.node.width * 0.4) : Math.floor(this.node.width * 0.8);
        login.height = Math.floor(this.node.height * 0.45);
        header.y = Math.floor(login.height / 2 - header.height / 2);
        error.y = Math.floor(login.height / 2 - header.height - error.height);
        //username
        username.width = login.width;
        username.y = Math.floor(login.height / 2 - header.height - error.height - username.height);
        name.x = Math.floor(name.width / 2 - username.width / 2);
        nameInput.width = Math.floor(username.width - name.width - 5);
        nameInput.x = Math.floor(name.width - username.width / 2 + nameInput.width / 2 + 5);
        //password
        password.width = login.width;
        password.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5);
        pasd.x = Math.floor(pasd.width / 2 - password.width / 2);
        pasdInput.width = Math.floor(password.width - name.width - 5);
        pasdInput.x = Math.floor(name.width - password.width / 2 + pasdInput.width / 2 + 5);
        //agreement
        agreement.width = login.width;
        agreement.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5 - agreement.height * 2.5);
        status.x = Math.floor(status.width / 2 - agreement.width / 2);
        agreedetail.x = Math.floor(status.width / 2 - agreement.width / 2 + agreedetail.width / 2 + 15);
        //buttons
        buttons.width = login.width;
        buttons.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5 - agreement.height * 2.5 - buttons.height * 1.2);
    },
    loginBtnClick: function loginBtnClick() {
        var _this = this;

        this.loginbtn.enabled = false;
        if (!this.status.isChecked) {
            this.setErrorLabel('unchecked', null);
        } else if (this.password.string.trim() == '' || this.username.string.trim() == '') {
            this.setErrorLabel('account', null);
        } else {
            userService.login(this.username.string, this.password.string).then(function (data) {
                localStorage.storeToken(data);
                userService.getCurrentUser(data.access_token).then(function (data) {
                    _this.loginbtn.enabled = true;
                    localStorage.storeUser(JSON.stringify(data));
                    cc.director.loadScene("Loading");
                    _this.node.destroy();
                }, function (error) {
                    _this.setErrorLabel('error', error);
                });
            }, function (error) {
                _this.setErrorLabel('error', error);
            });
        }
    },
    setErrorLabel: function setErrorLabel(type, error) {
        var _this2 = this;

        if (type.match(/uncheck/i)) {
            this.error.string = 'Please check before logging.';
        } else if (type.match(/account/i)) {
            this.error.string = "Username/Password is required.";
        } else if (type.match(/error/i)) {
            if (error.error_description) {
                this.error.string = error.error_description;
            } else if (error.error) {
                this.error.string = error.error.replace(/_/g, ' ');
            } else {
                this.error.string = 'Something Wrong!';
            }
        };
        setTimeout(function () {
            _this2.loginbtn.enabled = true;
            _this2.error.string = ' ';
        }, 2000);
    },
    onLoad: function onLoad() {
        this.initLogin();
        this.loginbtn.node.on('click', this.loginBtnClick, this);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Login.js.map
        