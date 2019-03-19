var MongoClient = require('mongodb').MongoClient;
var url = require('../config/db').url;

/**
 * Module to handle liaison to mondgoDB, based on the 4 http request accepted by the API
 */

function error_handler (err, message = "") {
    console.log('internal error:');
    return {
        status: 500,
        result: "internal error",
        err: {
            status: 500,
            message: message + '\n' + JSON.stringify(err)
        }
    };
}

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

    console.log("debugger get:");
    console.log("   collection: " + JSON.stringify(collection));
    console.log("   query: " + JSON.stringify(query));
    console.log("   sort: " + JSON.stringify(sort));
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
            if (query === {}) {
                return {status: 200, result: result};
            } else {
                switch (result.length) {
                    case null || undefined:
                        console.log("retour null");
                        return {
                            status: 400,
                            result: null
                        };
                    case 0:
                        if (query === {}){
                            console.log("retour null");
                            return {
                                status: 200,
                                result: result
                            };
                        } else {
                            console.log("not found");
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
                        console.log('retour 1 element => id: ' + result[0]["id"]);
                        return {
                            status: 200,
                            result: result[0]
                        };
                    default:
                        console.log('retour les ' + result.length + '-er resultats');
                        return {
                            status: 200,
                            result: result
                        };
                }
            }
        })
       .catch((err) => {
           error_handler(err)
       })
};

/**
 * delete an element of the collection passed as input
 * @param collection    collection from where to delete the file
 * @param query         query to target the element so delete
 */

self.delete = (collection, query) => {
    console.log("debugger delete:");
    console.log("   collection: " + JSON.stringify(collection));
    console.log("   query: " + JSON.stringify(query));
    return MongoClient.connect(url)
        .then((database) => {
            let dbo = database.db("sporttribe");
            dbo.collection(collection)
                .deleteOne(query)
        })
        .then((result) => {
            return {
                status: 200,
                result: result
            };
        })
        .catch((err) => {
            error_handler(err)
        })
};

/**
 * Modify an elements of the collection
 * @param collection    collection from where to patch an element
 * @param id            element id
 * @param params        params to modify
 */

self.patch = (collection, id, params) => {

    console.log("debugger patch:");
    console.log("   collection: " + JSON.stringify(collection));
    console.log("   id: " + JSON.stringify(id));
    console.log("   object: " + JSON.stringify(params));

    return self.get(collection, id, {})
        .then(responce => {
            if (!responce.status || responce.status !== 200) {
                console.log("id présenté n'est pas bon, put impossible");
                return {status: 400, result: null}
            } else {
                return MongoClient.connect(url)
                    .then(database => {
                        let dbo = database.db("sporttribe");
                        return dbo.collection(collection).updateOne({id: parseInt(id)}, {$set: params})
                    })
                    .then(() => {
                        return {
                            status: 200,
                            result: null
                        }
                    })
                    .catch((err) => {
                        error_handler(err, "probleme lors de la modification de la donnee")
                    })
            }
        })
        .catch((err) => {
            error_handler(err, 'probleme lors de la vérification de l\'existance de l\'object');
        })
};

/**
 * Add an element to the selected collection
 * @param collection    collection where to add an element
 * @param object        the new object
 */

self.post = (collection, object) => {

    console.log("debugger post:");
    console.log("   collection: " + JSON.stringify(collection));
    console.log("   object: " + JSON.stringify(object));

    if (object.id){
        return self.get(collection, {id: parseInt(id)})
            .then( responce => {
                if (responce.result.id){
                    console.log('l\'id existe déjà');
                    return {
                        status: 409,
                        result: 'conflict, l\'id existe déjà'
                    }
                }
            })
    } else {
        return self.get(collection, {}, {id: -1}, 1)
            .then(responce => {
                object.id = parseInt(responce.result.id) + 1;
                console.log("avant insertion, attrib id: " + object.id);
                return MongoClient.connect(url)
                    .then(database => {
                        let dbo = database.db("sporttribe");
                        return dbo.collection(collection).insertOne(object)
                    })
                    .then(() => {
                        return {
                            status: 200,
                            result: object.id
                        }
                    })
                    .catch((err) => {
                        error_handler(err, 'probleme lors de l\'insertion des parametres')
                    })
            })
            .catch((err) => {
                error_handler(err, 'probleme lors de la verification du post')
            })
    }
};

module.exports = self;