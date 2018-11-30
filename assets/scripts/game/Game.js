cc.Class({
    extends: cc.Component,

    properties: {
        master: {
            default: null,
            type: cc.Prefab,
        },
        score: {
            default: null,
            type: cc.Label,
        },
        player: {
            default: null,
            type: cc.Node,
        },
        alert: {
            default: null,
            type: cc.Label
        },
        scoreFlag: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    creatPrefab(){
            //new master
            let newMaster = cc.instantiate(this.master);
            //append master
            this.node.addChild(newMaster);
            //在master上暂存game
            newMaster.getComponent('Master').game = this;
            //make prefabFlag be false after a newMaster was created.
            window.Global.prefabFlag = false;
    },
    initScore(){
        //设置计分器的位置
        let width = this.node.width,
            height = this.node.height,
            score = cc.find('Score', this.node);
        score.setPosition(-width/2, height/2);
        score.zIndex = 1;
        this.score.string = 'Score: 0';
    },
    setScore(type){
        //更新计分器
        let alert = this.alert,
            alert_node = cc.find('Alert', this.node);
        alert_node.active = true;
        if(type == 'hotdog'){
            this.scoreFlag++;
            alert.string =  `+1`;
        }else if(type == 'stone'){
            this.scoreFlag--;
            alert.string = `-1`;
        }else{
            this.scoreFlag -=2;
            alert.string = `-2`;
        };
        let timer = setTimeout(()=>{
            alert_node.active = false;
        },500);
        this.score.string = 'Score: ' + this.scoreFlag;
    },
    init(){
        //init socreFlag
        this.scoreFlag = 0;
        //init prefabFlag
        window.Global.prefabFlag = false;
        //init the gameIsPlay of Global variable 
        window.Global.gameIsPlay = false;
        //init alert zindex
        cc.find('Alert', this.node).zIndex = 1;
        //init score position
        this.initScore();
    },
    onLoad () {
        //when load init something
        this.init();
    },
    startGame(dt){
        //create prefab while game is palying
        if(window.Global.gameIsPlay && window.Global.prefabFlag){
            this.creatPrefab();
        };
    },
    start () {
        //let each prefab interval be 0.8-sec
        setInterval(()=>{
            window.Global.prefabFlag = true;
        },800);
    },
    update (dt) {
        this.startGame();
    },
});
