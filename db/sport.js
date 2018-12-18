var url = require('../config/db');
var db = require('./utils');

let collection = 'sport';

class Sport {

    constructor(sport) {
        this.id = sport.id;
        this.name = sport.name;
        this.requirement = sport.requirement;
        this.icon = sport.icon
    }

    static isValid(sport) {
        return sport.id >=0 &&
            toString(sport.name) &&
            requirement.length >= 0 &&
            toString(sport.icon)
    }
}

const self = {};

self.collection = "sports";

self.get = (query = {}, sort = {}) => {

    return db.get(self.collection, query, sort)
};
self.post = (id, sport) => {
    if (Sport.isValide(sport)) {
        return MongoClient.connect(url)
            .then((database) => {
                let dbo = database.db("sporttribe");
                dbo.collection(self.collection).insert(sport)
            })
    } else {
        console.log("sport is not valide");
        throw "sport is not valide";
    }
};
self.delete = (query) => {
    return db.delete(self.collection, query)
};
self.patch = (id, params) => {
    return db.patch(self.collection, id, params)
};

module.exports = self;



