var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


let db = {


    utils: {

        /**
         * connextion to the database
         *
         * @param db_url        The url of the database
         * @param callback   The callback function
         * @returns          callback(mongodb database object)
         */
        connexionDb: (db_url, callback = null) => {
            MongoClient.connect(db_url).then((err, database) => {
                if (err) {
                    db.utils.errorhandler(err)
                } else {
                    if (typeof callback === "function") {
                        // Call it, since we have confirmed it is callable
                        callback(options);
                    } else {
                        return database;
                    }
                }
            })
        },

        /**
         * Creates an order when the form is submitted.
         *
         * @param collection        The collection aimed
         * @param query             The query, must be formated for a mongodb function find()
         * @param sort              The sorted parameter, must be formated for a mongodb cursor
         * @param callback          The callback function to execute after getting the data
         * @returns callback(result) or none
         */
        getForAll: (collection, query = {}, sort = {}, callback = null) => {
            connexionDb(url)
                .then((database) => {
                    database.collection(collection)
                        .find(query)
                        .sort(sort)
                        .toArray()
                })
                .then(result) => {
                    if (result.hasOwnProperty(length)) {

                        if (query === {}) {
                            status = 200;
                        } else {
                            switch (result.length) {
                                case null || undefined:
                                    console.log(" retour null");
                                    return null;
                                case 0:
                                    console.log(' retour []');
                                    return [];
                                default:
                                    console.log(' retour les ' + results.length + '-er resultats');
                                    return result;
                            }
                        }
                    }
                })

        },

        deleteForAll: (collection, query, callback) => {

        },

        /**
         * envoie au client l'erreur
         * @param res
         * @param err
         */
        errorhandler: (res, err) => {

            console.log('probleme: ' + JSON.stringify(err));
            if (err.name) {
                db.utils.sendresponse(500, JSON.parse(message), [{titre: 'Content-Type', content: 'application/json'}]);
            } else {
                db.utils.sendresponse(500, JSON.parse(err), [{titre: 'Content-Type', content: 'application/json'}]);
            }
        },

        /**
         * Envoie une reponse au client
         * @param res   object response d'express
         * @param status    status de la reponse
         * @param body     corps de la reponse
         * @param header_options header de la reponse sous la forme: [{titre: "", content: ""},{titre: "", content: ""}]
         */
        sendresponse: (res, status, body = null, header_options = null) => {

            if (header_options.hasOwnProperty(lenth)) {
                for (let header_option in header_options) {

                    if (header_option.titre && header_option.content) {
                        res.header(header_option.titre, header_option.content);
                    }
                }
            }
            res.status = parseInt(status);
            if (body) {
                res.send(JSON.stringify(body));
            } else {
                res.end();
            }

        }
    },

    event: require("event.js"),
    group: require("group.js"),
    message: require("message.js"),
    profil: require("profil.js")
};

exports.db = db;
