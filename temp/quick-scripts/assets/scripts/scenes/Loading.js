(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/scenes/Loading.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9c0e05WDqlEFo9t1beP+yEf', 'Loading', __filename);
// scripts/Loading.js

'use strict';

var flag;
cc.Class({
	extends: cc.Component,

	properties: {
		loadingbar: {
			default: null,
			type: cc.ProgressBar
		},
		words: {
			default: null,
			type: cc.Label,
			visible: false
		}
	},

	// LIFE-CYCLE CALLBACKS:
	initLoading: function initLoading() {
		var width = Math.ceil(this.node.width * 0.8),
		    height = this.node.height / 2,
		    loadingbar = cc.find('LoadingBar', this.node),
		    bar = cc.find('LoadingBar/bar', this.node),
		    word = cc.find('Words', this.node);
		loadingbar.width = width;
		loadingbar.y = loadingbar.height;
		bar.x = -width / 2;
		word.string = 'Loading...';
		word.y = -loadingbar.height;
	},
	loading: function loading() {
		var _this = this;

		var bar = cc.find('LoadingBar/bar', this.node);
		var timer = setInterval(function () {
			if (bar.width < bar.parent.width) {
				bar.width++;
			};
			if (bar.width >= bar.parent.width - 0.5) {
				clearInterval(timer);
				cc.director.loadScene("Game");
				_this.node.destroy();
			};
		}, 10);
	},
	onLoad: function onLoad() {
		this.initLoading();
	},
	start: function start() {
		this.loading();
	},
	update: function update(dt) {}
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
        //# sourceMappingURL=Loading.js.map
        