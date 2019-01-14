const express = require("express");
const router = express.Router();
//const utils = require('../../lib/routes_utils');
const eventDB = require('../../db/event');
const commentDB = require ('../../db/comment');
const validate = require('../../lib/validate');

router.get('/:id', (req, res) => {

    eventDB.get({id: parseInt(req.params.id)})
        .then(result => {
            res.status(result.status).json(event[0])
        })
});

router.get("/", (req, res) => {

    eventDB.get()
        .then(result => {
            res.status(result.status).json(result.result)
        })
});

router.post('/:id/players/:id_player', (req, res) =>  {

    if (parseInt(req.params.id <0 ||
            !parseInt(req.params.id_players) <0 )){
        res.status(400).send();
    }

    evenDB.get({id: parseInt(req.params.id)})
        .then(result => {
            if (result.status !==200) {
                res.status(result.status).json(result.result)
            } else {
                if (!result.players) {
                    res.status(500).send("internal error");
                } else {

                    result.players.push(parseInt(req.params.id_player));
                    return evenDB.patch(
                        req.params.id,
                        {players: result.players});
                }
            }
        })
        .then(result => {
            res.status(200).send('GET /api/events/:id')
        })
        .catch(err =>   {
            res.status(500).send('internal error')
        })
});

router.post('/', (req, res) => {

    evenDB.get()
        .then(results => {
            let lastElement = results.pop();
            if (!parseInt(req.body.id)) {
                req.body.id = lastElement.id;
            }
            req.body.created_at = date();
            req.body.lastUpdate = date();
            req.body.captain_id = req.body.creator_id;
            //req.body.groupe_id = req.session.group;

            return evenDB.post(req.body.id, req.body)
        })
        .then(result => {
            if (result.status){
                res.status(result.status).json(result.result)
            } else {
                res.status(result.status).send();
            }

        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err))
        })
});

router.patch('/:id/', (req, res) => {

    if (req.params.id <0 || req.body.length === 0){
        res.status(400).send('\'bad request\': la syntaxe des champs n\'est pas bonne')
    }
    for (let key in req.body){

        //a modifier, pas bon trop de cas possibles
        switch (key) {
            case "name":
                if (!validate.isString(req.body.name)) {
                    res.status(400)
                        .send('\'bad request\': la syntaxe des champs n\'est pas bonne')
                }
                break;
            case "descr":
                if (!validate.isString(req.body.descr)) {
                    res.status(400)
                        .send('\'bad request\': la syntaxe des champs n\'est pas bonne')
                }
                break;
            case "date":
                if (!validate.isDate(req.body.date)) {
                    res.status(400)
                        .send('\'bad request\': la syntaxe des champs n\'est pas bonne')
                }
                break;
            case "opened":
                if (req.body.opened !== "true" && req.body.opened !== "false") {
                    res.status(400)
                        .send('\'bad request\': la syntaxe des champs n\'est pas bonne')
                }
                break;
            case "price":
                if (req.body.price < 0) {
                    res.status(400)
                        .send('\'bad request\': la syntaxe des champs n\'est pas bonne')
                }
                break;
            case "location_id":
                if (req.body.location_id < 0) {
                    res.status(400)
                        .send('\'bad request\': la syntaxe des champs n\'est pas bonne')
                }
                break;
            case "sport_id":
                if (req.body.sport_id < 0) {
                    res.status(400)
                        .send('\'bad request\': la syntaxe des champs n\'est pas bonne')
                }
                break;
            case "id" || "players" ||
            "created_at" || "last_update" ||
            "groupe_id":
                res.status(400)
                    .send('bad request: le champs' + JSON.stringify(key) + ' n\'est pas modifiable');
                break;
            default:
                res.status(400)
                    .send('un champs ne correspond pas')
        }
    }

    evenDB.get({id: parseInt(req.params.id)})
        .then(result => {
           if (result.captain_id !== req.session.id){
               res.status(403)
                   .send('vous n\'etes pas capitaine de l\'events')
           } else {
               return evenDB.patch(req.params.id, req.body)
           }
        })
        .then(result => {
            res.status(200)
                .send('GET /api/events/'+ toString(req.params.id));
        })
        .catch(err => {
            res.status(500)
                .send(JSON.stringify(err))
        })
});

router.delete('/:id/remove/:id_player', (req, res) => {
    if (!parseInt(req.params.id) < 0 ||
        !parseInt(req.params.id_player)){

        eventDB.get({id: parseInt(req.params.id)})
            .then(result =>  {
                if (!parseInt(result.id)){
                    res.status(400).send('the id your refering to doesn\'t exist')
                } else {
                    delete result.players[toString(id_players)]
                    return eventDB.patch(
                            parseInt(req.params.id),
                            {players: result.players})
                }
            })
            .then(result => {
                res.status(result.status).send()
            })
            .catch(err => {
                res.status(500).send(JSON.stringify(err))
            })
    } else {
        res.status(400).send('the parameter are wrong')
    }
});

router.delete('/:id', (req, res) => {

    if (!parseInt(req.params.id) <0 ){

        evendDB.delete(parseInt(req.params.id))
            .then(result => {
                res.status(result.status).send()
            })
            .catch(err => {
                res.status(500).send()
            })

    } else {
        res.status(400).send('the id parameter is wrong')
    }

});

//comments

router.get('/:id/comments', (req, res) => {

    if (!parseInt(req.params.id) < 0){
        commentDB.get({to_event: parseInt(req.params.id)})
            .then(result => {
                res.status(result.status.json(result.result));
            })
            .catch(err => {
                res.status(500).send()
            })
    } else {
        res.status(400).send('the id parameter is wrong')
    }
});

router.get('/:id/comments/:id_comment', (req, res) => {

    if (!parseInt(req.params.id) < 0 ||
        !parseInt(req.params.id_comment < 0)){
        commentDB.get({
            id: parseInt(req.params.id_comment),
            to_event: parseInt(req.params.id)
        })
            .then(result => {
                res.status(result.status.json(result.result));
            })
            .catch(err => {
                res.status(500).send()
            })
    } else {
        res.status(400).send('the id parameter is wrong')
    }

});

router.post('/:id/comments', (req, res) => {

    if (!parseInt(req.params.id) <0 ){

        commentDB.get()
            .then(result => {
                lastElement = result.pop()
                if (!parseInt(req.body.id)) {
                    req.body.id = lastElement.id;
                }
                req.body.sent_at = date();
                return commentDB.post(parseInt(req.body.id), req.body)
            })
            .then(result => {
                res.status(result.status).send(JSON.stringify(result.result))
            })

    } else {
        res.status(400).send('the id parameter is wrong')
    }

});

router.patch('/:id/comments/:id_comment', (req, res) => {

    if (!parseInt(req.params.id) < 0 ||
        !parseInt(req.params.id_comment < 0 ||
        req.body.content)){

        commentDB.get({
            id: parseInt(req.params.id_comment),
            to_event: parseInt(req.params.id)
        })
        .then(result => {
            if (result.from !== req.session.id){
                res.status(403).send('this isn\'t your message')
            } else {
                return commentDB.patch(
                    parseInt(req.params.id_comment),
                    {content: req.body.content})
            }
        })
        .catch(err => {
            res.status(500).send()
        })
    } else {
        res.status(400).send('the id parameter is wrong')
    }
});

module.exports = router;
