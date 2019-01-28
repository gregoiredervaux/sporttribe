
const db = require('./utils');
const validate = require ('../lib/validate');

function Comment (comment) {

    this.id = comment.id;
    this.from = comment.from;
    this.to_event = comment.to_event;
    this.after = comment.after;
    this.sent_at = comment.sent_at;
    this.content = comment.content
}

Comment.prototype = {

    constructor: Comment,

    testFields: function (){
      return [
          validate().isInt(this.id),
          validate().isInt(this.from),
          validate().isInt(this.to_event),
          validate().isInt(this.after),
          validate().isDate(this.sent_at),
          validate().isString(this.content)
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

self.collection = "comments";

self.get = (query = {}, sort = {}) => {
    return db.get(self.collection, query, sort)
};

self.post = (id, inputComment) => {

    inputComment.sent_at = Date.now();

    let comment = new Comment(validate().allInput(inputComment));

    if (!comment.isValid()){
        return {
            status: 400,
            result: 'le commentaire n\'est pas valide',
            err: {
                status: 400,
                message: 'syntax error'
            }
        }
    }

    return db.post(self.collection, comment)
};

self.delete = (query) => {
    return db.delete(self.collection, query)
};

self.patch = (id, params) => {

    let comment = new Comment(validate().allInput(params));

    if (!comment.fullFieldsValids()){
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



