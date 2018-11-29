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
	initLoading(){
		let width = Math.ceil(this.node.width * 0.8),
			height = this.node.height/2,
			loadingbar = cc.find('LoadingBar', this.node),
			bar = cc.find('LoadingBar/bar', this.node),
			word = cc.find('Words', this.node);
		loadingbar.width = width;
		loadingbar.y = loadingbar.height;
		bar.x = -width/2;
		word.string = 'Loading...';
		word.y = -loadingbar.height;
	},
	loading(){
		let bar = cc.find('LoadingBar/bar', this.node);
		let timer = setInterval(()=>{
			if(bar.width<bar.parent.width){
				bar.width++;
			};
			if(bar.width >= bar.parent.width-0.5){
				clearInterval(timer);
				cc.director.loadScene("Game");
				this.node.destroy();
			};
		},10);
		
	},
	onLoad () {
		this.initLoading();
	},

	start () {
		this.loading();
	},

	update (dt) {
		
	},
});
