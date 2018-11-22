const bcrypt = require('bcrypt');

exports.gestion_utilistateur = {

    hashString: function (string) {
        let hashedSrting = "";
        bcrypt.hash(string, 10, function (err, hash) {
            if (err) throw (err);
            hashedSrting = hash;
        });

        return hashedSrting;
    },

    createUser: function (userData, MongoClient, url) {
        if (!(userData.email ||
            userData.firstname ||
            userData.lastname ||
            userData.new_passwd ||
            userData.conf_passwd)) {

            return {
                done: false,
                msg: "un des champs est vide"
            };

        } else {

            if (userData.new_passwd !== userData.conf_passwd) {
                return {
                    done: false,
                    msg: "les mots de passe ne sont pas les même"
                };
            } else {

                let date = new Date(year, month, day, hours, minutes, seconds);

                userData = {
                    __id: "",
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    email: userData.email,
                    encrypted_password: hashString(userData.new_passwd),
                    reset_password_token: "",
                    reset_password_token_sent_at: "",
                    sign_in_count: 0,
                    last_sign_at: date,
                    current_sign_in_ip: req.connection.remoteAddress,
                    created_at: date,
                    last_update: date,
                    groups_id: [],
                    picture: "default_user.png",
                    phone_number: "",
                    confirmation_token: "",
                    confirmed_at: "",
                    confirmation_sent_at: date,
                    unconfirmed_email: userData.email
                };

                MongoClient.connect(url, function (err, db) {
                    db_sporttribe = db.db("db_sporttribe");
                    // on recupere le dernier id dans la base de donnee
                    db_sporttribe.collection("user").findOne({$query: {}, $orderby: {$natural: -1}}, function (err, result) {
                        if (err) throw err;
                        userData.__id = result.__id + 1;
                    });

                    db_sporttribe.collection("user").insertOne(userData), function (err) {
                        if (err) throw err;
                        console.log("ajout de: " + userData['firstname'])
                    }
                });
            }
        }

    },

    identification: function (email, MongoClient, url) {

        let result_bd = null;
        MongoClient.connect(url, function (err, db) {

            db_sporttribe = db.db("db_sporttribe");

            db_sporttribe.find({email: email}, function (err, result) {
                if (err) throw err;
                result_bd = result;
            });
        });
        if (result_bd.length === 0) {
            return result_bd;
        } else {
            return {
                done: false,
                msg: "l'utilisateur n'a pas été trouvé"
            };
        }

    },

    authentification: function (userData, passwdTest, MongoClient, url) {

        let auth_success = null;

        MongoClient.connect(url, function (err, db) {

            db_sporttribe = db.db("db_sporttribe");

            db_sporttribe.collection("user").find({email: userData.email}, function (err, result) {
                if (err) throw err;
                bcrypt.compare(passwdTest, userData.encrypted_password, function(err, res){
                    if (err) throw err;
                    console.lg("il y a un probleme dans le hashage du mot de passe");
                    auth_success = res;
                });
            });
        });

        if (result_bd.length !== null) {
            return auth_success;
        } else {
            return {
                done: false,
                msg: "l'utilisateur n'a pas été trouvé"
            };
        }
    },

    getAccessLevel: function (id, MongoClient, url) {

        let accessLevel = null;

        MongoClient.connect(url, function (err, db) {

            db_sporttribe = db.db("db_sporttribe");

            db_sporttribe.collection("admin_user").find({__id: id}, function (err, result) {
                if (err) throw err;
                if (result === true){
                    accessLevel = admin;
                } else {
                    accessLevel = null;
                }

            });
        });

        return accessLevel;

    },

    setcookie: function() {
        //
    }
};