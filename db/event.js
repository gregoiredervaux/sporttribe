var url = require('../config/db');
var db = require('./utils');

class Event {

    constructor(event) {

        if (Event.isValid(event)) {
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
        } else {
            console.log("event pas bon")
        }
    }

    static isValid(event) {
        return event.id >= 0 &&
            toString(event.name) &&
            toString(event.description) &&
            event.players.length >= 0 &&
            db.utils.isDate(event.date)
            (event.opened === 1 || event.opened === true || event.opened === 0 || event.opened === false) &&
            event.price >= 0 &&
            db.utils.isDate(event.created_at) &&
            db.utils.isDate(event.last_update) &&
            event.location_id >= 0 &&
            event.sport_id >= 0 &&
            event.creator_id >= 0 &&
            event.captain_id >= 0 &&
            event.groupe_id >= 0
    }
}

const self = {};

    self.collection = "activities";

    self.get = (query = {}, sort = {}) => {
        console.log("test2: " + self.collection);
        return db.get(self.collection, query, sort)
    };
    self.post = (id, event) => {
        if (Event.isValide(event)) {
            return MongoClient.connect(url)
                .then((database) => {
                    let dbo = database.db("sporttribe");
                    dbo.collection(self.collection).insert(event)
                })
        } else {
            console.log("event is not valide");
            throw "event is not valide";
        }
    };
    self.delete = (query) => {
        return db.delete(self.collection, query)
    };
    self.patch = (id, params) => {
        return db.patch(self.collection, id, params)
    };

module.exports = self;



