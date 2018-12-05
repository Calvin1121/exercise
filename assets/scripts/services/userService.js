const urlConstant = require('urlConstant');
const request = new XMLHttpRequest();
module.exports = {
    login(username, password) {
        return new Promise((resolve, reject) => {
            let url = urlConstant.BASE_URL + urlConstant.LOGIN;
            let temp_params = {
                username: username,
                password: password,
                grant_type: "password",
                client_id: "1QOCTIlUrESYWpDNf9keR6OwAehoAzd5ISgwvglh",
                client_secret:"jQOb5WCV2betjVZYuDlqSYKrvmwF03dTCrE4NwQYXF8bHmzpkLCWfS8lxefbBE6zVOOOQbS9grHBCShkPX3oXzLgWdXnDA59kOmi1BcFpiDtOLOx3guQ7Ry966R5nv9q",
            };
            let flag = true, formData;
            try{
                new FormData();
            }catch (error){
                flag = false;
            };
            if(flag){
                formData = new FormData();
                for(let key in temp_params){
                    formData.append(key, temp_params[key]);
                };
            }else{
                formData = temp_params;
                request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            };
            request.open('POST', url, true);
            request.send(formData);
            request.onreadystatechange = ()=> {
                if(request.readyState === 4){
                    if(request.status >= 200 && request.status < 400){
                        resolve(JSON.parse(request.response));
                    }else{
                        reject(JSON.parse(request.response));
                    }
                }
            };
        })
    },
    getCurrentUser(token) {
        return new Promise((resolve, reject) => {
            let url = urlConstant.BASE_URL + urlConstant.CURRENT_USER;
            request.open('GET', url, true);
            request.setRequestHeader('Authorization',`Bearer ${token}`);
            request.send();
            request.onreadystatechange = ()=> {
                if(request.readyState === 4){
                    if(request.status >= 200 && request.status < 400){
                        resolve(JSON.parse(request.response));
                    }else{
                        reject(JSON.parse(request.response));
                    }
                }
            };
        })
    },
};