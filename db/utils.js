var MongoClient = require('mongodb').MongoClient;
var url = require('../config/db').url;

const self = {};

/**
 * Creates an order when the form is submitted.
 *
 * @param collection        The collection aimed
 * @param query             The query, must be formated for a mongodb function find()
 * @param sort              The sorted parameter, must be formated for a mongodb cursor
 * @param max               nombre maximal d'elements a recupérer
 * @returns callback(result) or none
 */
self.get = (collection, query = {}, sort = {}, max = 20) => {

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
                .limit(max)
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
                        if (query === {}){
                            return {
                                status: 200,
                                result: result
                            };
                        } else {
                            return {
                                status: 404,
                                result: "not found",
                                err: {
                                    status: 404,
                                    message: "not found"
                                }
                            }
                        }
                    case 1:
                        console.log(' retour 1 element');
                        return {
                            status: 200,
                            result: result[0]
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
       .catch((err) => {
           return {
               status: 500,
               result: "internal error",
               err: {
                   status: 500,
                   message: JSON.stringify(err)
               }
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
        .then(responce => {
            if (!responce.status || responce.status !== 200) {
                console.log("id présenté n'est pas bon, put impossible");
                return {status: 400, result: null}
            } else {
                return MongoClient.connect(url)
                    .then(database => {
                        let dbo = database.db("sporttribe");
                        return dbo.collection(collection).update({id: id}, {$set: params})
                    })
                    .then( () => {
                        return {
                            status: 200,
                            result: null
                        }
                    })
                    .catch(err => {
                        console.log('probleme lors de la modification de la donnée');
                        return {
                            status: 500,
                            result: "internal error",
                            err: {
                                status: 500,
                                message: JSON.stringify(err)
                            }
                        };
                    });
            }
        })
        .catch(err => {
            console.log("probème lors de la vérification de l'existant de l'event");
            return {
                status: 500,
                result: "internal error",
                err: {
                    status: 500,
                    message: JSON.stringify(err)
                }
            }
        })
};

self.post = (collection, object) => {

    if (object.id){
        self.get(collection, {id: parseInt(id)})
            .then( responce => {
                if (responce.result.id){
                    return {
                        status: 409,
                        result: 'conflict, l\'id existe déjà'
                    }
                }
            })
    } else {
        self.get(collectin, {}, {id: -1}, 1)
            .then(responce => {
                event.id = parseInt(responce.result.id);
                return MongoClient.connect(url)
                    .then(database => {
                        let dbo = database.db("sporttribe");
                        dbo.collection(self.collection).insert(event)
                    })
                    .then( () => {
                        return {
                            status: 200
                        }
                    })
                    .catch(err => {
                        return {
                            status: 500,
                            result: 'erreur',
                            err: {
                                status: 400,
                                message: JSON.stringify(err)
                            }
                        }
                    })
            })
            .catch(err => {
                console.log("probème lors de la vérification de l'existant du post");
                return {
                    status: 500,
                    result: "internal error",
                    err: {
                        status: 500,
                        message: JSON.stringify(err)
                    }
                }
            })
    }
};

module.exports = self;
