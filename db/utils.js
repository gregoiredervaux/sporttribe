var MongoClient = require('mongodb').MongoClient;
var url = require('../config/db').url;

const self = {};

/**
 * Creates an order when the form is submitted.
 *
 * @param collection        The collection aimed
 * @param query             The query, must be formated for a mongodb function find()
 * @param sort              The sorted parameter, must be formated for a mongodb cursor
 * @returns callback(result) or none
 */
self.get = (collection, query = {}, sort = {}) => {

    console.log("debugger get: ");
    console.log("collection: " + JSON.stringify(collection));
    console.log("query: " + JSON.stringify(query));
    console.log("sort: " + JSON.stringify(sort));
   return MongoClient.connect(url)
        .then((database) => {
            let dbo = database.db("sporttribe");
            return dbo.collection(collection)
                .find(query)
                .sort(sort)
                .toArray()
        })
        .then((result) => {
            console.log("result:");
            console.log(JSON.stringify(result));
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
                        console.log(' retour les ' + result.length + '-er resultats');
                        return {
                            status: 200,
                            result: result
                        };
                }
            }
        })
       .catch((err, result) => {
           return {
               status: 500,
               result: "internal error"
           };
       })
};

self.delete = (collection, query) => {
    MongoClient.connect(url)
        .then((database) => {
            let dbo = database.db("sporttribe");
            dbo.collection(collection)
                .deleteMany(query)
                .then((err, result) => {
                    if (err) return {status: 400, result: result};
                    return {status: 200, result: result}
                })
        })
};

self.patch = (collection, id, params) => {
    self.get(collection, id, {})
        .then(result => {
            if (!result.status || result.status !== 200) {
                console.log("id présenté n'est pas bon, put impossible");
                return {status: 400, result: null}
            } else {
                return MongoClient.connect(url)
                    .then(database => {
                        let dbo = database.db("sporttribe");
                        return dbo.collection(collection).update({id: id}, {$set: params})
                    })
                    .then(result, err => {
                        let status = 200;
                        (err)? status = 500: null;
                        return {
                            status: status
                        }
                    })
                    .catch(err => {
                        console.log('probleme lors de la modification de la donnée');
                        return {
                            status: 500,
                            result: JSON.stringify(err)
                        };
                    });
            }
        })
        .catch(err => {
            console.log("probème lors de la vérification de l'existant de l'event");
            return {
                status: 500,
                result: JSON.stringify(err)
            }
        })
};

/**
 * envoie au client l'erreur
 * @param status
 * @param err
 */
self.errorhandler = (status, err) => {
    return {status, err}
};

self.isValid = (object1, object2) => {
    let isValid = true;
    for (let property in object1) {
        if (!object2[property]) {
            isValid = false;
        }
    }
    return isValid;
};

module.exports = self;
