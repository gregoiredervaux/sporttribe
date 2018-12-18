const express = require("express");
const router = express.Router();
const utils = require('../lib/routes_utils');
const event =

router.get("/about", (req, res) => {
    res.render("index", {
        title: "Accueil",
        message: {
            title: "bien joué",
            class: "success",
            p: "ca fonctionneeee"
        }
    });
});

router.get("/", (req, res) => {

    let sports = [
        {
            id: 1,
            name: "volley",
            picture: "volley.png"
            },
        {
            id: 0,
            name: "badminton",
            picture: "badminton.png"
        }];

    let events = [
        {

            id: 1,
            name: "tournois de bandminton",
            description: "tournois de bad",
            players: [
                {
                    id: 0,
                    name:"gregoire",
                    picture: "gregoire.png",
                },
                {
                    id: 0,
                    name:"gregoire",
                    picture: "gregoire.png",
                }
            ],
            date: "2018-10-29 20:20:00",
            opened: true,
            price: 0,
            created_at: "2018-10-29 20:00:00",
            last_update: "2018-10-29 20:00:00",
            location: {
                id: 1,
                name: "salle de sport",
                id_maps: "a definir"
            },
            sport: {
                id: 0,
                name: "badminton.png",
                picture: "badminton.png"
            },
            creator_id: 0,
            captain_id: 0,
            groupe_id: 0
        }
    ];

    res.render("index", {
            title: "Sporttirbe",
            message: null,
            events: events,
            sports: sports,
        }
    );
});

module.exports = router;