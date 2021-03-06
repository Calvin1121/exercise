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
                client_id: "ek0CZGqS4i06dpiDYNpDz0k6boJJIih9ITCaT6DP",
                client_secret:"AccYt5VLmjktWuxoiS14dVZ59OtyayXbj8NlpaaX12F2j126COVrIuXLnjehrU49tYLysW6BWwOHSuIxOR0a3Ko84mZANiilwDpKNBajxTRV9oWmhUZjby3P5ICBb7up",
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