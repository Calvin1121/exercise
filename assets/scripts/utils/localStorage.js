const localStorage = {
	storeToken(data){
        cc.sys.localStorage.setItem("access_token", data.access_token);
        cc.sys.localStorage.setItem("refresh_token", data.refresh_token);
    },
    removeToken(){
    	cc.sys.localStorage.removeItem("access_token");
        cc.sys.localStorage.removeItem("refresh_token");
    },
    storeUser(data){
    	cc.sys.localStorage.setItem("current_user", data);
    },
    getItem(item){
        return cc.sys.localStorage.getItem(item);
    }
};