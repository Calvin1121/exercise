(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/services/userService.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b8e42oRGklF54vrGGFDDr4i', 'userService', __filename);
// scripts/services/userService.js

"use strict";

var urlConstant = require('urlConstant');
module.exports = {
    login: function login(username, password) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("grant_type", "password");
            formData.append("client_id", "1QOCTIlUrESYWpDNf9keR6OwAehoAzd5ISgwvglh");
            formData.append("client_secret", "jQOb5WCV2betjVZYuDlqSYKrvmwF03dTCrE4NwQYXF8bHmzpkLCWfS8lxefbBE6zVOOOQbS9grHBCShkPX3oXzLgWdXnDA59kOmi1BcFpiDtOLOx3guQ7Ry966R5nv9q");
            $.post({
                url: urlConstant.BASE_URL + urlConstant.LOGIN,
                data: formData,
                processData: false,
                contentType: false,
                success: function success(data) {
                    resolve(data);
                },
                error: function error(_error) {
                    reject(_error.responseJSON);
                }
            });
        });
    },
    getCurrentUser: function getCurrentUser(token) {
        return new Promise(function (resolve, reject) {
            $.get({
                url: urlConstant.BASE_URL + urlConstant.CURRENT_USER,
                headers: {
                    Authorization: 'Bearer ' + token
                },
                success: function success(data) {
                    resolve(data);
                },
                error: function error(_error2) {
                    reject(_error2.responseJSON);
                }
            });
        });
    }
};

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
        //# sourceMappingURL=userService.js.map
        