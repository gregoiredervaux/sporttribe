var MongoClient = require('mongodb').MongoClient;
var url = require('/config/db').url;

function erreur_db(err, res) {
    if (err) throw err;
    console.log(res);
}


function init() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Database created!");

        db_sporttribe = db.db("db_sporttribe");

        db_sporttribe.createCollection("utilisteurs", function (err, res) {
            erreur_db(err, res);
        });

        let utilisateurs = [
            {
                __id: 0,
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
                unconfirmed_email: ""
            },
            {
                __id: 1,
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
                unconfirmed_email: ""
            }
        ];

        db_sporttribe.collenction("utilisateur").insertMany(utilisateurs, function (err, res) {
            erreur_db(err, res);
        });

        db_sporttribe.createCollection("activity", function (err, res) {
            erreur_db(err, res);
        });

        let activity = {
            __id: 1,
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
            location_id: "1",
            sport_id: 0,
            creator_id: 0,
            captain_id: 0,
            groupe_id: 0
        };

        db_sporttribe.collenction("activity").insertMany(activity, function (err, res) {
            erreur_db(err, res);
        });

        db_sporttribe.createCollection("group", function (err, res) {
            erreur_db(err, res);
        });

        let groups = {
            __id: 0,
            name: "dev-team",
            description: "equipe de la dev",
            email_domain: "dev.fr",
            created_at: "2018-10-29 20:20:00",
            last_update: "2018-10-29 20:20:00",
            picture: "dev_team.png"
        };

        db_sporttribe.collenction("activity").insertMany(groups, function (err, res) {
            erreur_db(err, res);
        });

        db_sporttribe.createCollection("location", function (err, res) {
            erreur_db(err, res);
        });

        let location = {
            __id: 0,
            name: "gymanse edhec",
            adress: "edhec",
            city: "lille",
            postcode: "59000",
            created_at: "2018-10-29 20:20:00",
            last_update: "2018-10-29 20:20:00",
            sport_available: [
                0
            ]
        };

        db_sporttribe.collenction("localtion").insertMany(location, function (err, res) {
            erreur_db(err, res);
        });

        db_sporttribe.createCollection("sport", function (err, res) {
            erreur_db(err, res);
        });

        let sport = {
            __id: 0,
            name: "badminton",
            created_at: "2018-10-29 20:20:00",
            last_update: "2018-10-29 20:20:00",
            icon: "bad_icn.png"
        };

        db_sporttribe.collenction("sport").insertMany(sport, function (err, res) {
            erreur_db(err, res);
        });

        db_sporttribe.createCollection("admin_user", function (err, res) {
            erreur_db(err, res);
        });

        let admin_user = [
            {
                __id: 0,
            },
            {
                __id: 2,
            }
        ];

        db_sporttribe.collenction("admin_user").insertMany(admin_user, function (err, res) {
            erreur_db(err, res);
        });

    });
}

exports.init = init();
