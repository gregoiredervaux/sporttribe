var db = require('./utils');
const validate = require ('../lib/validate');

function Location (location) {

    this.id = location.id;
    this.name = location.name;
    this.adress = location.adress;
    this.city = location.city;
    this.postcode = location.postcode;
    this.created_at = location.created_at;
    this.last_update = location.last_update;
    this.sport_available = location.sport_available;
}

Location.prototype = {

    constructor: Location,

    testFields: function () {
        return [
            validate().isInt(this.id),
            validate().isString(this.name),
            validate().isString(this.adress),
            validate().isString(this.city),
            validate().isPostCode(this.postcode),
            validate().isDate(this.created_at),
            validate().isDate(this.last_update),
            validate().isArray(this.sport_available)
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

self.collection = "locations";

self.get = (query = {}, sort = {}) => {
    return db.get(self.collection, query, sort)
};

self.post = (id, inputLocation) => {

    inputLocation.created_at = Date.now();
    inputLocation.last_update = Date.naw();

    let location = new Location((validate().allInput(inputLocation)));

    if (!location.isValid()){
        return {
            status: 400,
            result: 'l\'event n\'est pas valide',
            err: {
                status: 400,
                message: 'syntax error'
            }
        }
    }

    return db.post(self.collection, location)
};

self.delete = (query) => {
    return db.delete(self.collection, query)
};
self.patch = (id, params) => {

    let location = new Location((validate().allInput(inputLocation)));

    if (!location.fullFieldsValids()){
        return {
            status: 400,
            result: 'l\'event n\'est pas valide',
            err: {
                status: 400,
                message: 'syntax error'
            }
        }
    }
    return db.patch(self.collection, id, params)
};

module.exports = self;



