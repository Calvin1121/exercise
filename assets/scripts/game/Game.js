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
        playername: {
            default:null,
            type: cc.Label,
        },
        player: {
            default: null,
            type: cc.Node,
        },
        timer: {
            default:null,
            type: cc.Label
        },
        alert: {
            default: null,
            type: cc.Label
        },
        palyOrPause: {
            default: null,
            type: cc.Button
        },
        scoreFlag: Number,
        prefabFlag: Boolean,
        timerFlag: Number,
    },

    // LIFE-CYCLE CALLBACKS:
    initPlayBtn(){
        let playbtn = cc.find('palyOrPause', this.node);
        playbtn.zIndex = 2;
    },
    initTimer(){
        let timer = cc.find('timer', this.node),
            position_x = this.node.width/2 - timer.width/2,
            position_y = this.node.height/2 - timer.height/2;  
        timer.x = position_x;
        timer.y = position_y;
        timer.zIndex = 1;
        this.timer = 'Timer: ';
    },
    creatPrefab(){
            //new master
            let newMaster = cc.instantiate(this.master);
            //append master
            this.node.addChild(newMaster);
            //在master上暂存game 和 player
            newMaster.getComponent('Master').game = this;
            newMaster.getComponent('Master').player = this.player;
            //make prefabFlag be false after a newMaster was created.
            this.prefabFlag = false;
    },
    setPlayerName(){
        //设置player 的名字
        if(localStorage.getItem('current_user')){
            let current_user =  JSON.parse(localStorage.getItem('current_user'));
            let nickname = current_user.profile.nickname;
            this.playername.string = nickname;
        }else{
            this.playername.string = 'Tourist';
        }
    },
    setScorePosition(){
        //设置计分器的位置
        let width = this.node.width,
            height = this.node.height,
            score = cc.find('score', this.node);
        score.setPosition(-width/2, height/2);
        score.zIndex = 1;
        this.score.string = 'Score: 0';
    },
    setScore(type){
        //更新计分器
        let alert = this.alert,
            alert_node = cc.find('alert', this.node);
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
    isPlay(){
        let playbtn = cc.find('palyOrPause', this.node);
        let status = cc.find('palyOrPause/status', this.node).getComponent(cc.Label);
        this.prefabFlag = true;
        this.palyOrPause.enabled = false;
        if(status.string.match(/play/i)){
            let timer = 3;
            status.string = String(timer--);
            status.fontSize = 40;
            let intervalTimer =  setInterval(()=>{
                status.string = String(timer--);
            },1000);
            let timeoutTimer = setTimeout(()=>{
                window.Global.gameIsPlay = true;
                this.palyOrPause.enabled = true;
                status.fontSize = 25;
                status.string = 'Pause';
                clearTimeout(intervalTimer);
                clearTimeout(timeoutTimer);
            },3005);
        }else{
            status.string = 'Play';
            window.Global.gameIsPlay = false;
            this.palyOrPause.enabled = true;
        };
    },
    setBtnPosition(dt){
        // set button position while game is playing or paused
        let playbtn = cc.find('palyOrPause', this.node),
            max_position_y = this.node.height/2 - playbtn.height/3;  
        if(window.Global.gameIsPlay){
            if(playbtn.y < max_position_y){
                playbtn.y += Math.ceil(dt)*11;
            }else if(playbtn.y >= max_position_y ){
                playbtn.y = max_position_y;
            };
        }else{
            if(playbtn.y > 0){
                playbtn.y -= Math.ceil(dt)*11;
            }else if(playbtn.y <= 0){
                playbtn.y = 0;
            };
        }
    },
    init(){
        //init socreFlag
        this.scoreFlag = 0;
        //init prefabFlag
        this.prefabFlag = false;
        //init the gameIsPlay of Global variable 
        window.Global.gameIsPlay = false;
        //init alert zindex
        cc.find('alert', this.node).zIndex = 1;
        //init timer
        this.initTimer();
        // cc.find('timer', this.node).y = this.node.height/2 - cc.find('timer', this.node).height/2;
        // cc.find('timer', this.node).zIndex = 1;
        //init playbtn
        this.initPlayBtn();
        //init playername
        this.setPlayerName();
        //init score position
        this.setScorePosition();
        // bind click event for playbtn
        this.palyOrPause.node.on('click', this.isPlay, this);
    },
    onLoad () {
        //when load init somthing
        this.init();
    },
    startGame(dt){
        //create prefab while game is palying
        if(window.Global.gameIsPlay && this.prefabFlag){
            this.creatPrefab();
        };
    },
    start () {
        //let each prefab interval be 0.8-sec
        setInterval(()=>{
            this.prefabFlag = true;
        },800);
    },
    update (dt) {
        this.startGame();
        this.setBtnPosition(dt);
    },
});
