const userService = require('userService');
cc.Class({
    extends: cc.Component,

    properties: {
        loginlayout: {
            default: null,
            type: cc.Node,
        },
        header: {
            default: null,
            type: cc.Label,
        },
        error: {
            default: null,
            type: cc.Label,
        },
        username: {
            default: null,
            type: cc.EditBox,
        },
        password: {
            default: null,
            type: cc.EditBox,
        },
        repassword: {
            default: null,
            type: cc.EditBox,
        },
        city: {
            default: null,
            type: cc.EditBox,
        },
        status: {
            default: null,
            type: cc.Toggle,
        },
        toggle: {
            default: null,
            type: cc.Button,
        },
        confirm: {
            default: null,
            type: cc.Button,
        },
        isSignIn: true,
    },

    // LIFE-CYCLE CALLBACKS:
    initLogin() {
        let login = cc.find('LoginLayout', this.node),
            header = cc.find('header', login),
            error = cc.find('error', login),
            username = cc.find('username', login),
            password = cc.find('password', login),
            repassword = cc.find('repassword', login),
            city = cc.find('city', login),
            name = cc.find('name', username),
            pasd = cc.find('pasd', password),
            repasd = cc.find('repasd', repassword),
            citylabel = cc.find('citylabel', city),
            nameInput = cc.find('nameeditbox', username),
            pasdInput = cc.find('passwordeditbox', password),
            repasdInput = cc.find('repasswordeditbox', repassword),
            cityInput = cc.find('cityeditbox', city),
            agreement = cc.find('agreement', login),
            status = cc.find('agreestatus', agreement),
            agreedetail = cc.find('agreedetail', agreement),
            buttons = cc.find('buttons', login),
            toggle = cc.find('toggle', buttons),
            confirm = cc.find('confirm', buttons);
        login.width = this.node.width > 900 ? Math.floor(this.node.width * 0.4) : Math.floor(this.node.width * 0.8);
        //set login height
        let signinHeight = Math.ceil(header.height + error.height + username.height + password.height * 1.5 + agreement.height * 2.5 + buttons.height * 2),
            signupHeight = Math.ceil(header.height + error.height + username.height + password.height * 1.5 + repassword.height * 1.5 + city.height * 1.5 + agreement.height * 2.5 + buttons.height * 2)
        login.height = this.isSignIn == 'signin' ? signinHeight : signupHeight;
        //header & error
        header.y = Math.floor(login.height / 2 - header.height / 2);
        error.y = Math.floor(login.height / 2 - header.height - error.height);
        //username
        username.width = login.width;
        username.y = Math.floor(login.height / 2 - header.height - error.height - username.height);
        nameInput.width = Math.floor(username.width - name.width - 5);
        this.setXPositionForEditBox(name, nameInput, username);
        //password
        password.width = login.width;
        password.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5);
        pasdInput.width = Math.floor(password.width - name.width - 5);
        this.setXPositionForEditBox(pasd, pasdInput, password);
        if (this.isSignIn) {
            this.header.string = 'Sign In';
            repassword.active = false;
            city.active = false;
            //agreement
            agreement.width = login.width;
            agreement.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5 - agreement.height * 2.5);
            //buttons
            buttons.width = login.width;
            buttons.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5 - agreement.height * 2.5 - buttons.height * 1.2);
            toggle.children.filter(cc_node => cc_node.name == 'signup')[0].active = true;
            toggle.children.filter(cc_node => cc_node.name == 'signin')[0].active = false;
        } else {
            this.header.string = 'Sign Up';
            repassword.active = true;
            city.active = true;
            //repassword
            repassword.width = login.width;
            repassword.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5 - repassword.height * 1.5);
            repasdInput.width = Math.floor(password.width - name.width - 5);
            this.setXPositionForEditBox(repasd, repasdInput, repassword);
            //city
            city.width = login.width;
            city.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5 - repassword.height * 1.5 - city.height * 1.5);
            citylabel.x = Math.floor(pasd.width / 2 - password.width / 2);
            cityInput.width = Math.floor(password.width - name.width - 5);
            cityInput.x = Math.floor(name.width - password.width / 2 + pasdInput.width / 2 + 5);
            //agreement
            agreement.width = login.width;
            agreement.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5 - repassword.height * 1.5 - city.height * 1.5 - agreement.height * 2.5);
            //buttons
            buttons.width = login.width;
            buttons.y = Math.floor(login.height / 2 - header.height - error.height - username.height - password.height * 1.5 - repassword.height * 1.5 - city.height * 1.5 - agreement.height * 2.5 - buttons.height * 1.2);
            toggle.children.filter(cc_node => cc_node.name == 'signin')[0].active = true;
            toggle.children.filter(cc_node => cc_node.name == 'signup')[0].active = false;
        };
        //set button & sprite
        confirm.x = Math.floor((confirm.width - buttons.width) / 2);
        toggle.x = Math.floor((buttons.width - toggle.width) / 2);
        //agreement
        status.x = Math.floor(status.width / 2 - agreement.width / 2);
        agreedetail.x = Math.floor(status.width / 2 - agreement.width / 2 + agreedetail.width / 2 + 15);
    },
    confirmButton() {
        cc.director.preloadScene("Loading");
        this.confirm.enabled = false;
        if (!this.status.isChecked) {
            this.setErrorLabel('unchecked', null);
            return;
        } else if (!this.isSignIn && (this.password.string.trim() == '' || this.username.string.trim() == '' || this.repassword.string.trim() == '')) {
            this.setErrorLabel('signup', null);
            return;
        } else if (this.isSignIn && (this.password.string.trim() == '' || this.username.string.trim() == '')) {
            this.setErrorLabel('signin', null);
            return;
        } else if (!this.isSignIn && (this.password.string.trim() != this.repassword.string.trim())) {
            this.setErrorLabel('password', null);
            return;
        };
        if (this.isSignIn) {
            this.signIn();
        } else {
            this.signUp();
        };
    },
    signIn() {
        userService.login(this.username.string, this.password.string).then(data => {
            cc.sys.localStorage.setItem("access_token", data.access_token);
            cc.sys.localStorage.setItem("refresh_token", data.refresh_token);
            userService.getCurrentUser(data.access_token).then(data => {
                this.confirm.enabled = true;
                cc.sys.localStorage.setItem("current_user", JSON.stringify(data));
                cc.director.loadScene("Loading");
                this.node.destroy();
            }, error => {
                this.setErrorLabel('error', error);
            })
        }, error => {
            this.setErrorLabel('error', error);
        });
    },
    signUp() {
        this.node.destroy();
        console.log('signup')
    },
    setErrorLabel(type, error) {
        this.error.node.color = new cc.color(235, 58, 58, 255);
        if (type.match(/uncheck/i)) {
            this.error.string = 'Please check before logging.';
        } else if (type.match(/signup/i)) {
            this.error.string = "Username/Password/RePassword is required.";
        } else if (type.match(/signin/i)) {
            this.error.string = "Username/Password is required.";
        } else if (type.match(/password/i)) {
            this.error.string = "Password and RePassword should be same.";
        } else if (type.match(/error/i)) {
            if (error.error_description) {
                this.error.string = error.error_description;
            } else if (error.error) {
                this.error.string = error.error.replace(/_/g, ' ');
            } else {
                this.error.string = 'Something Wrong!';
            }
        };
        setTimeout(() => {
            this.confirm.enabled = true;
            this.error.string = '';
        }, 2000)
    },

    setXPositionForEditBox(child1, child2, parent) {
        child1.x = Math.floor(child1.width / 2 - parent.width / 2);
        child2.x = Math.floor(child1.width - parent.width / 2 + child2.width / 2 + 5);
    },
    signinOrUp() {
        this.isSignIn = !this.isSignIn;
        this.password.string = '';
        this.repassword.string = '';
        this.confirm.enabled = true;
        this.error.string = '';
        this.initLogin();
    },
    onLoad() {
        this.isSignIn = true;
        this.initLogin();
        this.toggle.node.on('click', this.signinOrUp, this);
        this.confirm.node.on('click', this.confirmButton, this);
    }
});