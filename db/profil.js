var url = require('../config/db');
var db = require('./utils').db;

let collection = 'activity';

class User {

    id;
    first_name;
    last_name;
    email;
    encrypted_password;
    reset_password_token;
    reset_password_token_sent_at;
    sign_in_count;
    last_sign_at;
    current_sign_in_ip;
    created_at;
    last_update;
    groups_id;
    picture;
    confirmation_token;
    confirmed_at;
    confirmation_sent_at;
    unconfirmed_email;

    constructor(user) {
        if (User.isValid(user)) {
            for (let property in this) {
                if (property) {
                    this[property] = user[property];
                }
            }
        }
    }


    static isValid(user) {
        return db.isValid(user, User)
    }
}


const self = {
    get: (collection, query = {}, sort = {}) => {
        return db.get(collection, query = {}, sort = {})
    },
    post: (id, user) => {
        if (Group.isValide(user)) {
            return db.utils.connexionDb(url)
                .then((database => {
                    database.collection(collection).insert(user)
                }))
        } else {
            console.log("user is not valide");
            throw "user is not valide";
        }
    },
    delete: (collection, query) => {
        return db.delete(collection, query)
    },
    patch: (collection, id, params) => {
        return db.patch(collection, id, params)
    },
};

exports = self;

