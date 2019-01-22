var db = require('./utils');
const validate = require ('../lib/validate');

function Sport (sport){

    this.id = sport.id;
    this.name = sport.name;
    this.requirement = sport.requirement;
    this.icon = sport.icon
}

Sport.prototype = {
    constructor: Sport,

    testFields: function () {
        return [
            validate.isInt(this.id),
            validate.isString(this.name),
            validate.isArray(this.requirement),
            validate.isPicture(this.this.icon)
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

self.collection = "sports";

self.get = (query = {}, sort = {}) => {
    return db.get(self.collection, query, sort)
};

self.post = (id, inputSport) => {

    let sport = new Sport(validate.allInput(inputSport));

    if (!sport.isValid()){
        return {
            status: 400,
            result: 'l\'sport n\'est pas valide',
            err: {
                status: 400,
                message: 'syntax error'
            }
        }
    }

    return db.post(self.collection, sport)
};
self.delete = (query) => {
    return db.delete(self.collection, query)
};
self.patch = (id, params) => {
    let sport = new Event(validate.allInput(params));

    if (!sport.fullFieldsValids()){
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



