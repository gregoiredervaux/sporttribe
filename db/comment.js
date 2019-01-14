const url = require('../config/db');
const db = require('./utils');
const validate = require ('../lib/validate');

class Comment {

    constructor(comment) {

        if (Comment.isValid(comment)) {
            this.id = comment.id;
            this.from = comment.from;
            this.to_event = comment.to_event;
            this.after = comment.after;
            this.sent_at = comment.sent_at;
            this.content = comment.content
        } else {
            console.log("comment pas bon")
        }
    }

    static isValid(comment) {
        return comment.id >= 0 &&
            comment.from >=0 &&
            comment.to_event >=0 &&
            (comment.after >=0 || comment.after === "root") &&
            db.utils.isDate(comment.sent_at) &&
            toString(comment.content)
    }
}

const self = {};

self.collection = "comments";

self.get = (query = {}, sort = {}) => {
    console.log("test2: " + self.collection);
    return db.get(self.collection, query, sort)
};
self.post = (id, comment) => {
    if (Comment.isValide(comment)) {
        return MongoClient.connect(url)
            .then(database => {
                let dbo = database.db("sporttribe");
                dbo.collection(self.collection).insert(comment)
            })
            .then(result => {
                return {
                    status: 200
                }
            })
            .catch(err => {
                return {
                    status: 500,
                    result: JSON.stringify(err)
                }
            })
    } else {
        console.log("comment is not valide");
        return {
            status: 400
        }
    }
};
self.delete = (query) => {
    return db.delete(self.collection, query)
};
self.patch = (id, params) => {
    return db.patch(self.collection, id, params)
};

module.exports = self;



