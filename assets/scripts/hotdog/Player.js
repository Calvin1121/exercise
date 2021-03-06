cc.Class({
    extends: cc.Component,

    properties: {
        accel: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    initPlayer(){
        //获取player的name
        let name = cc.find('name', this.node);
        //设置player的y轴坐标与层级
        this.node.y = this.node.height + name.height/2 -this.node.parent.height/2;
        this.node.zIndex = 1;
        //设置name的坐标与player的名字
        name.setPosition(0, -name.height*2.5);
        if(localStorage.getItem('current_user')){
            let current_user =  JSON.parse(localStorage.getItem('current_user'));
            let username = current_user.game_user.username;
            name.getComponent(cc.Label).string = username;
        }else{
            name.getComponent(cc.Label).string = 'Tourist';
        }
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
    onTouchStart(event){
        let touchLoc = event.getLocation();
        if (touchLoc.x >= cc.winSize.width/2) {
            this.accLeft = false;
            this.accRight = true;
        } else {
            this.accLeft = true;
            this.accRight = false;
        };
    },
    onTouchEnd(event){
        this.accLeft = false;
        this.accRight = false;
    },
    movePlayer(dt){
        let width = this.node.parent.width;
        if(this.accLeft && window.GameConfig.gameIsPlay){
            if(this.node.x > this.node.width/2 - width/2){
                this.node.x -= this.accel * Math.pow(dt, 2);
            }else{
                this.node.x = this.node.width/2 - width/2;
            }
        };
        if(this.accRight && window.GameConfig.gameIsPlay){
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
        cc.Canvas.instance.node.on('touchstart', this.onTouchStart, this);
        cc.Canvas.instance.node.on('touchend', this.onTouchEnd, this);
    },
    update (dt) {
        this.movePlayer(dt);
    },
    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);  
        cc.Canvas.instance.node.off('touchstart', this.onTouchStart, this);
        cc.Canvas.instance.node.off('touchend', this.onTouchEnd, this);
    }
});
