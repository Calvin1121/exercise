cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    initTimer(){
        let position_x = this.node.parent.width/2 - this.node.width/2,
            position_y = this.node.parent.height/2 - this.node.height/2;  
        this.node.x = position_x;
        this.node.y = position_y;
        this.node.zIndex = 1;
        this.node.getComponent(cc.Label).string = `Timer: ${window.Global.gameTimer}`;
    },
    onLoad () {
        this.initTimer();
    },
    start () {

    },
    // update (dt) {},
});
