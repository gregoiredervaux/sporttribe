var MongoClient = require('mongodb').MongoClient;
var url = require('../config/db');

const self = {


    /**
     * connextion to the database
     *
     * @param db_url        The url of the database
     * @param callback   The callback function
     * @returns          callback(mongodb database object)
     */
    connexionDb: (db_url, callback = null) => {

        console.log(db_url);
        MongoClient.connect(db_url, {useNewUrlParser: true})
            .then((database) => {
                if (typeof callback === "function") {
                    // Call it, since we have confirmed it is callable
                    callback(options);
                } else {
                    return database;
                }

            }, (err) => {
                console.log("probleme connexion database");
                return db.utils.errorhandler(500, err)
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
    get: (collection, query = {}, sort = {}) => {
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
                                return {
                                    status: 400,
                                    result: null
                                };
                            case 0:
                                console.log(' retour []');
                                return {
                                    status: 200,
                                    result: result
                                };
                            default:
                                console.log(' retour les ' + results.length + '-er resultats');
                                return {
                                    status: 200,
                                    result: result
                                };
                        }
                    }
                }
            })
    },

    delete: (collection, query) => {
        db.utils.connexionDb(url)
            .then((database) => {
                database.collection(collection)
                    .deleteMany(query)
                    .then((err, result) => {
                        if (err) return {status: 400, result: result};
                        return {status: 200, result: result}
                    })
            })
    },

    patch: (collection, id, params) => {
        db.utils.get(collection, id, {})
            .then(result => {
                if (!result.status || result.status !== 200) {
                    console.log("id présenté n'est pas bon, put impossible");
                    return {status: 400, result: null}
                } else {
                    return db.utils.connexionDb(url)
                        .then(database => {
                            database.collection(collection).update({id: id}, {params})
                        })
                        .catch(err => {
                            console.log('probleme lors de la modification de la donnée');
                            throw err;
                        });
                }
            })
            .catch(err => {
                console.log("probème lors de la vérification de l'existant de l'event");
                throw err;
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

    isValid(object1, object2) {
        let isValid = true;
        for (let property in object1) {
            if (!object2[property]) {
                isValid = false;
            }
        }
        return isValid;
    }
};

exports = self;
