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
		},
		scene: '',
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
	loading(dt){
		let bar = cc.find('LoadingBar/bar', this.node);
		if(bar.width<bar.parent.width){
			bar.width += Math.ceil(dt)*3;
		};
		if(bar.width >= bar.parent.width-0.5){
			cc.director.loadScene(this.scene);
			this.node.destroy();
		};
	},
	setScene(){
		if(localStorage.getItem('access_token')){
			this.scene = 'Game';
		}else{
			this.scene = 'Login';
		};
	},
	onLoad () {
		this.initLoading();
		this.setScene();
	},
	start(){
		cc.director.preloadScene(this.scene);
	},
	update (dt) {
		this.loading(dt);
	},
});
