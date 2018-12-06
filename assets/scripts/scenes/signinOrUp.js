cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    initPageView(){
        let width = Math.floor(this.node.parent.width),
            height = Math.floor(this.node.parent.height),
            orgin_width = this.node.width;
        this.node.width = width;
        this.node.height = height;
        cc.find('view', this.node).width = width;
        cc.find('view', this.node).height = height;
        cc.find('view/content/signin', this.node).width = width;
        cc.find('view/content/signin', this.node).height = height;
        cc.find('view/content/signup', this.node).width = width;
        cc.find('view/content/signup', this.node).height = height;
        cc.find('view/content', this.node).width = width * 2;
        cc.find('view/content', this.node).height = height;
        cc.find('view/content', this.node).x += (Math.abs(orgin_width - width))/2;
    },

    onLoad () {
        this.initPageView();
    },

    start () {

    },

    // update (dt) {},
});
