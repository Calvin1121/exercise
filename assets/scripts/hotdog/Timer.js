cc.Class({
    extends: cc.Component,

    properties: {
        timerFlag: false,
        intervalTimer: null,
    },

    // LIFE-CYCLE CALLBACKS:
    initTimer(){
        let position_x = Math.floor(this.node.parent.width/2 - this.node.width/2),
            position_y = Math.floor(this.node.parent.height/2 - this.node.height/2);  
        this.node.x = position_x;
        this.node.y = position_y;
        this.node.zIndex = 1;
        this.node.getComponent(cc.Label).string = `Timer: ${window.GameConfig.gameTimer}`;
    },
    updateTimer(dt){
        if(window.GameConfig.gameIsPlay && this.timerFlag){
            if(window.GameConfig.gameTimer > 0){
                this.timerFlag = false;
                window.GameConfig.gameTimer--;
                this.node.getComponent(cc.Label).string = `Timer: ${window.GameConfig.gameTimer}`;
            }else if(window.GameConfig.gameTimer <= 0){
                window.GameConfig.gameTimer = 0;
                window.GameConfig.gameIsPlay = false;
                clearInterval(this.intervalTimer);
            }
        }else{
            this.timerFlag = false;
        };
    },
    onLoad () {
        this.initTimer();
    },
    start () {
        this.intervalTimer = setInterval(()=>{
            this.timerFlag = true;
        },1000);
    },
    update (dt) {
        this.updateTimer(dt);
    },
});
