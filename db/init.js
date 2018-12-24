var MongoClient = require('mongodb').MongoClient;
var url = require('../config/db').url;

function erreur_db(err, res) {
    console.log(err);
}


function init() {

    console.log(url);

    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        console.log("Database created!");

        db_sporttribe = db.db("sporttribe");

        try {
            db_sporttribe.createCollection("utilisateurs", function (err, res) {
                erreur_db(err, res);
            });
        } catch (error){
            console.error(error)
        }

        let utilisateurs = [
            {

                id: 0,
                first_name: "guillaume",
                last_name: "Denac",
                email: "gui@dev.fr",
                encrypted_password: "motdepasse",
                reset_password_token: "",
                reset_password_token_sent_at: "",
                sign_in_count: 0,
                last_sign_at: "2018-10-29 20:20:00",
                current_sign_in_ip: "192.168.2.2",
                created_at: "2018-10-29 20:20:00",
                last_update: "2018-10-29 20:20:00",
                groups_id: [
                    0
                ],
                picture: "pict_prof_gui.png",
                confirmation_token: "",
                confirmed_at: "2018-10-29 20:20:00",
                confirmation_sent_at: "2018-10-29 20:20:00",
                unconfirmed_email: "",
                participate: [0]
            },
            {

                id: 1,
                first_name: "gregoire",
                last_name: "Derv",
                email: "gre@dev.fr",
                encrypted_password: "0000000000",
                reset_password_token: "",
                reset_password_token_sent_at: "",
                sign_in_count: 0,
                last_sign_at: "2018-10-29 20:20:00",
                current_sign_in_ip: "192.168.2.2",
                created_at: "2018-10-29 20:20:00",
                last_update: "2018-10-29 20:20:00",
                groups_id: [
                    0
                ],
                picture: "pict_prof_gre.png",
                confirmation_token: "",
                confirmed_at: "2018-10-29 20:20:00",
                confirmation_sent_at: "2018-10-29 20:20:00",
                unconfirmed_email: "",
                participate: [0]
            }
        ];

        db_sporttribe.collection("utilisateurs").insertMany(utilisateurs, function (err, res) {
            erreur_db(err, res);
        });

        try {
            db_sporttribe.createCollection("activities", function (err, res) {
                erreur_db(err, res);
            });
        } catch (error){
            console.error(error)
        }

        let activity = [{

            id: 0,
            name: "tournois de bandminton",
            description: "tournois de bad",
            players: [
                0,
                1
            ],
            date: "2018-10-29 20:20:00",
            opened: true,
            price: 0,
            created_at: "2018-10-29 20:00:00",
            last_update: "2018-10-29 20:00:00",
            location_id: 0,
            sport_id: 0,
            creator_id: 0,
            captain_id: 0,
            groupe_id: 0
        }];

        db_sporttribe.collection("activities").insertMany(activity, function (err, res) {
            erreur_db(err, res);
        });

        try {
            db_sporttribe.createCollection("groups", function (err, res) {
                erreur_db(err, res);
            });
        } catch (error){
            console.error(error)
        }

        let groups = [{

            id: 0,
            name: "dev-team",
            description: "equipe de la dev",
            email_domain: "dev.fr",
            created_at: "2018-10-29 20:20:00",
            last_update: "2018-10-29 20:20:00",
            picture: "dev_team.png"
        }];

        db_sporttribe.collection("groups").insertMany(groups, function (err, res) {
            erreur_db(err, res);
        });

        try {
            db_sporttribe.createCollection("locations", function (err, res) {
                erreur_db(err, res);
            });
        } catch (error){
            console.error(error)
        }

        let location = [{

            id: 0,
            name: "gymanse edhec",
            adress: "edhec",
            city: "lille",
            postcode: "59000",
            created_at: "2018-10-29 20:20:00",
            last_update: "2018-10-29 20:20:00",
            sport_available: [
                0
            ]
        }];

        db_sporttribe.collection("locations").insertMany(location, function (err, res) {
            erreur_db(err, res);
        });

        try {
            db_sporttribe.createCollection("sports", function (err, res) {
                erreur_db(err, res);
            });
        } catch (error){
            console.error(error)
        }

        let sport = [{

            id: 0,
            name: "badminton",
            icon: "bad_icon.png",
            requirement: ["chaussures de salle", "raquette", "terrain", "filet de badminton"]
        }];

        db_sporttribe.collection("sports").insertMany(sport, function (err, res) {
            erreur_db(err, res);
        });

        try {
            db_sporttribe.createCollection("admin_users", function (err, res) {
                erreur_db(err, res);
            });
        } catch (error){
            console.error(error)
        }

        let admin_user = [
            {

                id: 0,
            },
            {

                id: 1,
            }
        ];

        db_sporttribe.collection("admin_users").insertMany(admin_user, function (err, res) {
            erreur_db(err, res);
        });

        try {
            db_sporttribe.createCollection("messages", function (err, res) {
                erreur_db(err, res);
            });
        } catch (error){
            console.error(error)
        }

        let message = [{

            id: 0,
            from: 0,
            to: 1,
            sent_at: "2018-10-29 20:20:00",
            seen_at: "2018-10-29 20:20:00",
            content: "sacré pitch dit donc !"
        }];

        db_sporttribe.collection("messages").insertMany(message, function (err, res) {
            erreur_db(err, res);
        });

        try {
            db_sporttribe.createCollection("comments", function (err, res) {
                erreur_db(err, res);
            });
        } catch (error){
            console.error(error)
        }

        let comment = [{

            id: 0,
            from: 0,
            to: 1,
            sent_at: "2018-10-29 20:20:00",
            seen_at: "2018-10-29 20:20:00",
            content: "sacré pitch dit donc !"
        }];

        db_sporttribe.collection("comments").insertMany(message, function (err, res) {
            erreur_db(err, res);
        });
    });
}

exports.init = init();
