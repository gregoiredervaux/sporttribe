var url = require('../config/db');
var db = require('./utils').db;

let collection = 'activity';

class Group {

    id;
    name;
    description;
    email_domain;
    created_at;
    last_update;
    picture;

    constructor(group) {
        if (Group.isValid(group)) {
            for (let property in this) {
                if (property) {
                    this[property] = group[property];
                }
            }
        }
    }


    static isValid(group) {
        return db.isValid(group, Group)
    }
}


const self = {
    get: (collection, query = {}, sort = {}) => {
        return db.get(collection, query = {}, sort = {})
    },
    post: (id, group) => {
        if (Group.isValide(group)) {
            return db.utils.connexionDb(url)
                .then((database => {
                    database.collection(collection).insert(group)
                }))
        } else {
            console.log("group is not valide");
            throw "group is not valide";
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

