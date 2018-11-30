const config = JSON.parse(JSON.stringify(window.GameConfig));
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    initButton(){
        //设置button层级绑定事件
        this.node.zIndex = 2;
        this.node.enabled = true;
        this.node.on('click', this.isPlay, this);
    },
    isPlay(){
        if(!this.node.enabled){
            return;
        };
        let status = this.node.children.filter(node=>!!node.active)[0];
        let type = status.getComponent(cc.Label);
        this.node.enabled = false;
        if(type.string.match(/play/i)){
            let timer = 3;
            type.string = String(timer--);
            type.fontSize = 40;
            let intervalTimer =  setInterval(()=>{
                type.string = String(timer--);
            },1000);
            let timeoutTimer = setTimeout(()=>{
                window.GameConfig.gameIsPlay = true;
                this.node.enabled = true;
                type.fontSize = 25;
                type.string = 'Pause';
                clearTimeout(intervalTimer);
                clearTimeout(timeoutTimer);
            },3001);
        }else if(type.string.match(/pause/i)){
            type.string = 'Play';
            window.GameConfig.gameIsPlay = false;
            this.node.enabled = true;
        }else if(type.string.match(/gameover/i)){
            window.GameConfig.gameTimer = config.gameTimer;
            window.GameConfig.gameIsPlay = config.gameTimer;
            // window.GameConfig.rePlay = true;
            cc.director.loadScene("Loading");
            this.node.destroy();
        };
    },
    setBtnPosition(dt){
        // set button position while game is playing or paused
        let max_position_y = this.node.parent.height/2 - this.node.height/3;  
        if(window.GameConfig.gameIsPlay){
            if(this.node.y < max_position_y){
                this.node.y += Math.ceil(dt)*11;
            }else if(this.node.y >= max_position_y ){
                this.node.y = max_position_y;
            };
        }else{
            if(this.node.y > 0){
                this.node.y -= Math.ceil(dt)*11;
            }else if(this.node.y <= 0){
                this.node.y = 0;
            };
        };

    },
    onLoad () {
        this.initButton();
    },
    update (dt) {
        this.setBtnPosition(dt);
        if(!!window.GameConfig.gameTimer){
            cc.find('play', this.node).active = true;
            cc.find('replay', this.node).active = false;
        }else{
            cc.find('play', this.node).active = false;
            cc.find('replay', this.node).active = true;
            cc.find('replay', this.node).getComponent(cc.Label).string = 'GameOver';
        }
    },
    onDestroy(){
        this.node.off('click', this.isPlay, this);
    }
});
