const db = require('./utils');
const validate = require ('../lib/validate');


function Event (event){

    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.players = event.players;
    this.date = event.date;
    this.opened = event.opened;
    this.price = event.price;
    this.created_at = event.created_at;
    this.last_update = event.last_update;
    this.location_id = event.location_id;
    this.sport_id = event.location_id;
    this.creator_id = event.creator_id;
    this.captain_id = event.captain_id;
    this.groupe_id = event.groupe_id;

}

Event.prototype = {

    constructor: Event,

    testFields: function () {
        return [
            validate().isInt(this.id),
            validate().isString(this.name),
            validate().isString(this.description),
            validate().isArray(this.players),
            validate().isDate(this.date),
            validate().isBoolean(this.opened),
            validate().isFloat(this.price),
            validate().isDate(this.created_at),
            validate().isDate(this.last_update),
            validate().isInt(this.location_id),
            validate().isString(this.sport_id),
            validate().isInt(this.creator_id),
            validate().isInt(this.captain_id),
            validate().isInt(this.groupe_id)
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

    self.collection = "activities";

    self.get = (query = {}, sort = {}) => {
        return db.get(self.collection, query, sort)
    };

    self.post = (req, id, inputEvent) => {

        inputEvent.created_at = Date.now();
        inputEvent.last_update = Date.now();
        inputEvent.creator_id = req.session.id;
        inputEvent.captain_id = req.session.id;
        inputEvent.groupe_id = req.session.group;

        let event = new Event(validate().allInput(inputEvent));

        if (!event.isValid()){
            return {
                status: 400,
                result: 'l\'event n\'est pas valide',
                err: {
                    status: 400,
                    message: 'syntax error'
                }
            }
        }

        return db.post(self.collection, event)
    };

    self.delete = (query) => {
        return db.delete(self.collection, query)
    };

    self.patch = (id, params) => {

        let event = new Event(validate().allInput(params));

        if (!event.fullFieldsValids()){
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



