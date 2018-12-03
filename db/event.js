var url = require ('/config/db');
var db = require('./utils').db;

let collection = 'activity'

class Event {

    id;
    name;
    description;
    players;
    date;
    open;
    price;
    created_at;
    last_update;
    location_id;
    sport_id;
    creator_id;
    captain_id;
    groupe_id;

    constructor(event){
        if (Event.isValid(event)){
            for (let property in this){
                if (property){
                    this[property] = event[property];
                }
            }
            //this.id = event.id;
            //this.name = event.name;
            //this.description = event.description;
            //this.players = event.players;
            //this.date = event.date;
            //this.opened = event.opened;
            //this.price = event.price;
            //this.created_at = event.created_at;
            //this.last_update = event.last_update;
            //this.location_id = event.location_id;
            //this.sport_id = event.location_id;
            //this.creator_id = event.creator_id;
            //this.captain_id = event.captain_id;
            //this.groupe_id = event.groupe_id;
        }
    }


    static isValid (event){
        return db.isValid(event, Event)
    }
}

const self = {};


self.post = function(id, event){

    if (Event.isValide(event)){
        db.utils.connexionDb(url)
            .then((database => {
                database.collection(collection).insert(event)
            }))
    }
};

self.put = function(id, eventParams){
    db.utils.getForAll(collection, id, {})
        .then(result => {
            if (result){
                return db.utils.connexionDb(url)
            }
        })
        .then(database => {
            database.collection(collection).update({id: id}, {eventParams})
        })
        .catch(err => {
            throw err;
    })
};
