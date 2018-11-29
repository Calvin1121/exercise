(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '03127OmTsBB6bkvFnHXpcnM', 'Player', __filename);
// scripts/game/Player.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        accel: 0
    },

    // LIFE-CYCLE CALLBACKS:
    initPlayer: function initPlayer() {
        var name = cc.find('name', this.node);
        this.node.y = this.node.height + name.height / 2 - this.node.parent.height / 2;
        this.node.zIndex = 1;
        name.setPosition(0, -name.height * 3);
        this.node.zIndex = 1;
    },
    onKeyDown: function onKeyDown(event) {
        this.keyBoardEvent('done');
    },
    onKeyUp: function onKeyUp(event) {
        this.keyBoardEvent('cancel');
    },
    keyBoardEvent: function keyBoardEvent(type) {
        if (event.keyCode == 37) {
            this.accLeft = type == 'done' ? true : false;
        } else if (event.keyCode == 39) {
            this.accRight = type == 'done' ? true : false;
        };
    },
    movePlayer: function movePlayer(dt) {
        var width = this.node.parent.width;
        if (this.accLeft) {
            if (this.node.x > this.node.width / 2 - width / 2) {
                this.node.x -= this.accel * Math.pow(dt, 2);
            } else {
                this.node.x = this.node.width / 2 - width / 2;
            }
        };
        if (this.accRight) {
            if (this.node.x < width / 2 - this.node.width / 2) {
                this.node.x += this.accel * Math.pow(dt, 2);
            } else {
                this.node.x = width / 2 - this.node.width / 2;
            }
        };
    },
    onLoad: function onLoad() {
        this.initPlayer();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    start: function start() {},
    update: function update(dt) {
        this.movePlayer(dt);
    }
});

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
        //# sourceMappingURL=Player.js.map
        