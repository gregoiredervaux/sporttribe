const userDB = require('../db/profil');
const crypto = require('crypto');

self = {};

self.resetConnexion = (res) => {
    res.cookie('sessionToken', "");
    res.cookie('email', "");

};

self.checkPassword = (email, password) => {
    userDB.get({email: email})
        .then(res => {
            if (res.status && res.status === 200){
                return res.result.encrypted_password === password
            } else {
                console.log("error checkPassword=>getUser");
                return false
            }
        })
};

self.checkToken = (email, cookie_token, session_token) => {
    userDB.get({email: email})
        .then(res => {
            if (res.status && res.status === 200){
                return res.result.cookie_token === cookie_token &&
                    res.result.session_token === session_token
            } else {
                console.log("error checkPassword=>getUser");
                return false
            }
        })
};

self.generateToken = (length) => {
    let str =  [];
    while (length !==0){
        str.push(crypto.randomBytes(1));
        length --;
    }
    let ascii = "";
    for (byte of str){
        ascii += String.fromCharCode(parseInt(byte, 2).toString(10));
    }
    return ascii
};

self.Cookie = {};

self.Cookie.verifyToken = (req) => {
    if (req.cookie(sessionToken)){
        userDB.get({id: parseInt(req.cookie(id))})
            .then(resDB => {
                if (resDB.status === 200){
                    return resDB.result.sessionToken === sessionToken
                } else {
                    console.log('error status: ' + resDB.status);
                    console.log('error responce: ' + resDB.result);
                    return false
                }
            })
    }
};

self.Cookie.setToken = (req, res) => {

    res.cookie('sessionToken', generateToken(32))
};



module.exports = self;