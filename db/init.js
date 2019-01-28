const MongoClient = require('mongodb').MongoClient;
const data = require('../lib/initData');
const url = require('../config/db').url;

function errorHandler(err, message) {
    console.log(message + '\n' + JSON.stringify(err))
}

/**
 * fonction d'initialisation des données de tests
 * on test d'abord si la collection du fichier data existe
 *      si oui on ne fait rien
 *      si non on ajoute la collection et on ajoute les données qui lui corresponde
 */

function init() {

    console.log(url);

    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) errorHandler(err, 'probleme avec la connection');
        console.log("Database created|connected!");

        let db_sporttribe = db.db("sporttribe");

        db_sporttribe.listCollections().toArray()
            .then(collections => {

                let addPromise =  [];
                console.log('current collections: ');

                for (let table in data) {
                    let is_there = false;
                    for (let collection of collections) {

                        is_there = (collection.name === table) ? true : is_there;
                    }
                    if (!is_there) {
                        console.log('ajout de la collection de test: ' + table);
                        addPromise.push(db_sporttribe.collection(table).insertMany(data[table]))
                    } else {
                        console.log('   ' + JSON.stringify(table));
                    }
                }
                return Promise.all(addPromise);
            })
            .catch(err => {
                errorHandler(err, 'erreur lors de l\'initiation des tables');
            });
    });
}

exports.init = init();
