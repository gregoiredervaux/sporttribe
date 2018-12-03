var MongoClient = require('mongodb').MongoClient;
var url = require ('/config/db');

let self = {

    utils: {

        /**
         * connextion to the database
         *
         * @param db_url        The url of the database
         * @param callback   The callback function
         * @returns          callback(mongodb database object)
         */
        connexionDb: (db_url, callback = null) => {
            MongoClient.connect(db_url)
                .then((database) => {
                    if (typeof callback === "function") {
                        // Call it, since we have confirmed it is callable
                        callback(options);
                    } else {
                        return database;
                    }

                }, (err) => {
                    console.log("probleme connexion database");
                    return db.utils.errorhandler(500,err)
                })
        },

        /**
         * Creates an order when the form is submitted.
         *
         * @param collection        The collection aimed
         * @param query             The query, must be formated for a mongodb function find()
         * @param sort              The sorted parameter, must be formated for a mongodb cursor
         * @returns callback(result) or none
         */
        getForAll: (collection, query = {}, sort = {}) => {
            db.utils.connexionDb(url)
                .then((database) => {
                    database.collection(collection)
                        .find(query)
                        .sort(sort)
                        .toArray()
                })
                .then((result) => {
                    if (result.hasOwnProperty(length)) {

                        if (query === {}) {
                            return {status: 200, result: result};
                        } else {
                            switch (result.length) {
                                case null || undefined:
                                    console.log(" retour null");
                                    return {status: 400,
                                        result: result};
                                case 0:
                                    console.log(' retour []');
                                    return {status: 200,
                                            result: result};
                                default:
                                    console.log(' retour les ' + results.length + '-er resultats');
                                    return {status: 200,
                                            result: result};
                            }
                        }
                    }
                })
        },

        deleteForAll: (collection, query) => {
            db.utils.connexionDb(url)
                .then((database) => {
                    database.collection(collection)
                        .deleteMany(query)
                        .then((err, result) => {
                            if(err) return {status: 400, result: result};
                            return {status: 200, result: result}
                        })
                })
        },

        /**
         * envoie au client l'erreur
         * @param status
         * @param err
         */
        errorhandler: (status, err) => {
            return {status, err}
        },

        isValid(object1, object2){
            let isValid = true;
            for (let property in object1){
                if (!object2[property]){
                    isValid = false;
                }
            }
            return isValid;
        }

    },

    event: require("./event"),
    group: require("./group"),
    message: require("./message"),
    profil: require("./profil")
};

exports.db = self;
