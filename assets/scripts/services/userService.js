const urlConstant = require('urlConstant');
module.exports = {
    login(username, password){
        return new Promise((resolve, reject)=>{
            let formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("grant_type", "password");
            formData.append("client_id", "1QOCTIlUrESYWpDNf9keR6OwAehoAzd5ISgwvglh");
            formData.append("client_secret", "jQOb5WCV2betjVZYuDlqSYKrvmwF03dTCrE4NwQYXF8bHmzpkLCWfS8lxefbBE6zVOOOQbS9grHBCShkPX3oXzLgWdXnDA59kOmi1BcFpiDtOLOx3guQ7Ry966R5nv9q"); 
            $.post({
                url:urlConstant.BASE_URL + urlConstant.LOGIN,
                data:formData,
                processData:false,
                contentType:false,
                success:(data)=>{
                    resolve(data);
                },
                error:(error)=>{   
                    reject(error.responseJSON);
                }
            })
        })
    },
    getCurrentUser(token){
        return new Promise((resolve, reject)=>{
            $.get({
                url:urlConstant.BASE_URL + urlConstant.CURRENT_USER,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                success:(data)=>{
                    resolve(data);
                },
                error:(error)=>{   
                    reject(error.responseJSON);
                }
            })
        })
    },
};
