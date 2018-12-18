var url = require('../config/db');
var db = require('./utils');

let collection = 'activity';

class User {

    constructor(user) {
        if (User.isValid(user)) {
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
        } else {
            console.log("user pas bon")
        }
    }

    static isValid(user) {
        return true
    }
}

const self = {};

self.collection = "utilisateurs";

self.get = (query = {}, sort = {}) => {
    console.log("test2: " + self.collection);
    return db.get(self.collection, query, sort)
};
self.post = (id, user) => {
    if (User.isValide(user)) {
        return MongoClient.connect(url)
            .then((database) => {
                let dbo = database.db("sporttribe");
                dbo.collection(self.collection).insert(user)
            })
    } else {
        console.log("user is not valide");
        throw "user is not valide";
    }
};
self.delete = (query) => {
    return db.delete(self.collection, query)
};
self.patch = (id, params) => {
    return db.patch(self.collection, id, params)
};

module.exports = self;
