var db = require('./utils');
const validate = require ('../lib/validate');

function Message (message) {

    this.message = message.id;
    this.from = message.from;
    this.to = message.to;
    this.sent_at = message.sent_at;
    this.seen_at = message.seen_at;
    this.content = message.content;
}

Message.prototype =  {

    constructor: Message,

    testFields: function () {
        return [
            validate.isInt(this.id),
            validate.isInt(this.from),
            validate.isInt(this.to),
            validate.isDate(this.sent_at),
            validate.isDate(this.seen_at),
            validate.isString(this.content)
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

const self = {}

self.collection = "messages";

self.get = (query = {}, sort = {}) => {
    return db.get(self.collection, query, sort)
};

self.post = (id, inputMessage) => {

    inputMessage.sent_at = Date.now();

    let message = new Message(validate.allInput(inputMessage));

    if (!message.fullFieldsValids()){
        return {
            status: 400,
            result: 'l\'message n\'est pas valide',
            err: {
                status: 400,
                message: 'syntax error'
            }
        }
    }

    return db.post(self.collection, message)
};

module.exports = self;