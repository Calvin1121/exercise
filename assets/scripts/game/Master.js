const masters = ['stone', 'ghost', 'hotdog'];
cc.Class({
    extends: cc.Component,

    properties: {
        hotDogPickRadius:0,
        masterPickRadius:0,
        moveSpeed: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    setPerfabPosition(){
    	let min_width = this.node.width - this.node.parent.width/2,
    		max_width = this.node.parent.width/2 - this.node.width;
        //随机生成master
    	let index = Math.floor(Math.random() * masters.length);
        //依据类型设定master和player之间的距离
        if(masters[index] == 'hotdog'){
            this.pickRadius = this.hotDogPickRadius;
        }else{
            this.pickRadius = this.masterPickRadius;
        };
        //将生成的master的sprite激活
    	cc.find(masters[index], this.node).active = true;
        //随机设置master的位置
    	this.node.setPosition(this.randomFrom(min_width, max_width), this.node.parent.height/2 + this.node.height);
    },
    movePerfab(dt){
        //下落master,如果master将要离开显示区域是销毁
    	if(this.node.y <= this.play_height - this.node.parent.height/2){
            this.node.destroy();
            return;
        }else{
            this.node.y -= this.moveSpeed * Math.pow(dt, 2);
        }
    },
    getPlayerDistance(){
        let playerPos = this.game.player.getPosition();
        return this.node.position.sub(playerPos).mag();
    },
    onPicked(){
        //获取与被player picked的节点
        let target = this.node;
        //判断master的类型
        let target_type = target.children.filter(v=>v.active)[0].name;
        //更细game里计分器的数值
        this.game.setScore(target_type);
        //销毁picked的master
        this.node.destroy();
    },
    randomFrom(lower,upper){
        return  Math.ceil((Math.random() * (upper - lower) + lower));
    },
    onLoad () {
    	this.setPerfabPosition();
        this.pickRadius;
    },
    start () {
        this.play_height = Math.ceil(this.game.player.height + cc.find('name', this.game.player).height)/2;
    },

    update (dt) {
        if(window.GameConfig.gameIsPlay){
            this.movePerfab(dt);
        };
        if(this.getPlayerDistance() < this.pickRadius){
            this.onPicked();
            return;
        };
    },
});
