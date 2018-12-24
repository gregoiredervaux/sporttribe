var url = require('../config/db');
var db = require('./utils');

class Location {

    constructor(location) {

        if (Location.isValid(location)) {
            this.id = location.id;
            this.name = location.name;
            this.adress = location.adress;
            this.city = location.city;
            this.postcode = location.postcode;
            this.created_at = location.created_at;
            this.last_update = location.last_update;
            this.sport_available = location.sport_available;
        } else {
            console.log("location pas bon")
        }
    }

    static isValid(location) {
        return location.id >= 0 &&
            toString(location.name) &&
            toString(location.adress) &&
            toString(location.city) &&
            location.postcode.length >= 0 && location.postcode.length < 100000 &&
            db.utils.isDate(location.created_at) &&
            db.utils.isDate(location.last_update)
    }
}

const self = {};

self.collection = "locations";

self.get = (query = {}, sort = {}) => {
    console.log("test2: " + self.collection);
    return db.get(self.collection, query, sort)
};
self.post = (id, location) => {
    if (Location.isValide(location)) {
        return MongoClient.connect(url)
            .then((database) => {
                let dbo = database.db("sporttribe");
                dbo.collection(self.collection).insert(location)
            })
    } else {
        console.log("location is not valide");
        throw "location is not valide";
    }
};
self.delete = (query) => {
    return db.delete(self.collection, query)
};
self.patch = (id, params) => {
    return db.patch(self.collection, id, params)
};

module.exports = self;



