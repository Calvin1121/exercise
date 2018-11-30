cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    initButton(){
        //设置button层级绑定事件
        this.node.zIndex = 2;
        this.node.on('click', this.isPlay, this);
    },
    isPlay(){
        // let playbtn = cc.find('PlayOrPause', this.node);
        let status = cc.find('status', this.node).getComponent(cc.Label);
        window.Global.prefabFlag = true;
        this.node.enabled = false;
        if(status.string.match(/play/i)){
            let timer = 3;
            status.string = String(timer--);
            status.fontSize = 40;
            let intervalTimer =  setInterval(()=>{
                status.string = String(timer--);
            },1000);
            let timeoutTimer = setTimeout(()=>{
                window.Global.gameIsPlay = true;
                this.node.enabled = true;
                status.fontSize = 25;
                status.string = 'Pause';
                clearTimeout(intervalTimer);
                clearTimeout(timeoutTimer);
            },3001);
        }else{
            status.string = 'Play';
            window.Global.gameIsPlay = false;
            this.node.enabled = true;
        };
    },
    setBtnPosition(dt){
        // set button position while game is playing or paused
        let max_position_y = this.node.parent.height/2 - this.node.height/3;  
        if(window.Global.gameIsPlay){
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
        }
    },
    onLoad () {
        this.initButton();
    },
    update (dt) {
        this.setBtnPosition(dt);
    },
});
