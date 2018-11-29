cc.Class({
    extends: cc.Component,

    properties: {
        accel: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    initPlayer(){
        let name = cc.find('name', this.node);
        this.node.y = this.node.height + name.height/2 -this.node.parent.height/2;
        this.node.zIndex = 1;
        name.setPosition(0, -name.height*3);
        this.node.zIndex = 1;
    },
    onKeyDown(event){
        this.keyBoardEvent('done');
    },
    onKeyUp(event){
        this.keyBoardEvent('cancel');
    },
    keyBoardEvent(type){
        if(event.keyCode == 37){
            this.accLeft = type == 'done'?true:false;
        }else if(event.keyCode == 39){
            this.accRight = type == 'done'?true:false;
        };
    },
    movePlayer(dt){
        let width = this.node.parent.width;
        if(this.accLeft){
            if(this.node.x > this.node.width/2 - width/2){
                this.node.x -= this.accel * Math.pow(dt, 2);
            }else{
                this.node.x = this.node.width/2 - width/2;
            }
        };
        if(this.accRight){
            if(this.node.x < width/2 - this.node.width/2){
                this.node.x += this.accel * Math.pow(dt, 2);
            }else{
                this.node.x = width/2 - this.node.width/2;
            }
        };
    },
    onLoad () {
        this.initPlayer();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
    },

    start () {

    },

    update (dt) {
        this.movePlayer(dt);
    },
});
