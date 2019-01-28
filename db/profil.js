var db = require('./utils');
const validate = require ('../lib/validate');


function Profil (profil){

    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.encrypted_password = user.encrypted_password;
    this.reset_password_token = user.reset_password_token;
    this.reset_password_token_sent_at = user.reset_password_token_sent_at;
    this.sign_in_count = user.sign_in_count;
    this.last_sign_at = user.last_sign_at;
    this.current_sign_in_ip = user.current_sign_in_ip;
    this.created_at = user.created_at;
    this.last_update = user.last_update;
    this.groups_id = user.groups_id;
    this.picture = user.picture;
    this.confirmation_sent_at = user.confirmation_sent_at;
    this.unconfirmed_email = user.unconfirmed_email;
}

Profil.prototype = {

    constructor: Profil,

    testFields: function () {
        return [
            validate().isInt(this.id),
            validate().isString(this.firstName),
            validate().isString(this.lastName),
            validate().isEmail(this.email),
            validate().isString(this.encrypted_password),
            validate().isString(this.reset_password_token),
            validate().isDate((this.reset_password_token_sent_at)),
            validate().isInt(this.sign_in_count),
            validate().isDate(this.last_sign_at),
            validate().isIp(this.current_sign_in_ip),
            validate().isDate(this.created_at),
            validate().isDate(this.last_update),
            validate().isInt(this.groups_id),
            validate().isPicture(this.picture),
            validate().isDate((this.confirmation_sent_at)),
            validate().isEmail(this.unconfirmed_email)
        ]
    },

    isValid: function () {
        const arrayTest = this.testFields();
        for (let test in arrayTest){
            if (!test){
                return false
            }
        }
        return true
    },

    fullFieldsValids: function () {

        const arrayTest = this.testFields();
        for (let test in arrayTest){
            if (test === false){
                return false
            }
        }
        return true
    }

};

const self = {};

self.collection = "users";

self.get = (query = {}, sort = {}) => {
    return db.get(self.collection, query, sort)
};

self.post = (id, inputUser) => {

    inputUser.reset_password_token = "None";
    inputUser.reset_password_token_sent_at = Date.now();
    inputUser.sign_in_count = 0;
    inputUser.last_sign_at = Date.now();
    inputUser.current_sign_in_ip = req.connection.remoteAddress;
    inputUser.created_at = Date.now();
    inputUser.last_update = Date.now();
    inpuUser.confirmation_sent_at = Date.now();

    let user = new User(validate().allInput(inputUser));

    if (!user.isValid()){
        return {
            status: 400,
            result: 'l\'event n\'est pas valide',
            err: {
                status: 400,
                message: 'syntax error'
            }
        }
    }

    return db.post(self.collection, user)
};

self.delete = (query) => {
    return db.delete(self.collection, query)
};

self.patch = (id, params) => {

    let user = new User(validate().allInput(inputUser));

    if (!user.fullFieldsValids()){
        return {
            status: 400,
            result: 'l\'les parametres ne sont pas valide',
            err: {
                status: 400,
                message: 'syntax error'
            }
        }
    }
    return db.patch(self.collection, id, params)
};

module.exports = self;
