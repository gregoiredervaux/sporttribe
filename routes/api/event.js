const express = require("express");
const router = express.Router();
const eventDB = require('../../db/event');
const commentDB = require ('../../db/comment');
const validate = require('../../lib/validate');


router.get('/:id', (req, res) => {

    if(!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    eventDB.get({id: parseInt(req.params.id)})
        .then(responce => {
            res.status(responce.status).json(responce.result)
        })
});

router.get("/", (req, res) => {

    eventDB.get()
        .then(responce => {
            res.status(responce.status).json(responce.result)
        })
});

router.post('/:id/players/:idPlayer', (req, res) => {

    if (!validate().isInt(req.params.id) ||
        !validate().isInt(req.params.idPlayer)){
        res.status(400).send()
    } else {
        eventDB.get({id: parseInt(req.params.id)})
            .then(responce => {

                if (responce.status !==200) {
                    res.status(responce.status).json(responce.result)
                } else {
                    if (!responce.result.players) {
                        console.log('post players error: !responce.players');
                        res.status(500).send("internal error");
                    } else if (responce.result.players.includes(parseInt(req.params.idPlayer))){
                        res.status(409).send("Cette personne participe déjà à l'évènement");
                    } else {
                        responce.result.players.push(parseInt(req.params.idPlayer));
                        return eventDB.patch(
                            req.params.id,
                            {players: responce.result.players});
                    }
                }
            })
            .then(responce => {
                res.status(responce.status)
                    .send('GET /api/events/'+ req.params.id)
            })
            .catch(err =>   {
                console.log('post error: ' + err.message);
                res.status(500).send('internal error')
            })
    }
});

router.post('/', (req, res) => {

    eventDB.post(req, req.body.id, req.body)
        .then(responce => {
            res.status(responce.status).json(responce.result)
        })
        .catch(err => {
            console.log('post error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        });
});

router.patch('/:id/', (req, res) => {

    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    eventDB.get({id: parseInt(req.params.id)})
        .then(responce => {
            if (responce.captain_id !== req.session.id){
                res.status(403)
                    .send('vous n\'etes pas capitaine de l\'events')
            } else {
                return eventDB.patch(req.params.id, req.body)
            }
        })
        .then(responce => {
            res.status(responce.status)
                .send('GET /api/events/'+ req.params.id);
        })
        .catch(err => {
            console.log('patch error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        })
});

router.delete('/:id/remove/:idPlayer', (req, res) => {
    if (!validate().isInt(req.params.id) ||
        !validate().isInt(req.params.idPlayer)){
        res.status(400).send()
    }
    eventDB.get({id: parseInt(req.params.id)})
        .then(responce =>  {
            if (!parseInt(responce.result.id) && parseInt(responce.result.id) !== 0){
                res.status(400).send('the id your refering to doesn\'t exist: ' + responce.result.id)
            } else {
                let newPlayers = responce.result.players.filter((value) => {
                    return parseInt(value) !== parseInt(req.params.idPlayer);
                });
                return eventDB.patch(
                    parseInt(req.params.id),
                    {players: newPlayers})
            }
        })
        .then(responce => {
            res.status(responce.status).send()
        })
        .catch(err => {
            console.log('delete error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        })
});

router.delete('/:id', (req, res) => {

    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    eventDB.get({id: parseInt(req.params.id)})
        .then(responce =>  {
            if (!parseInt(responce.result.id) && parseInt(responce.result.id) !== 0){
                res.status(400).send('the id your refering to doesn\'t exist: ' + responce.result.id)
            } else {
                eventDB.delete({id: parseInt(req.params.id)})
                    .then(responce => {
                        console.log("responce: " + JSON.stringify(responce));
                        res.status(responce.status).send()
                    })
                    .catch(err => {
                        console.log('delete error: ' + JSON.stringify(err.message));
                        res.status(500).send('internal error')
                    })
            }
        });
});

router.get('/:id/comments', (req, res) => {

    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    commentDB.get({to_event: parseInt(req.params.id)})
        .then(responce => {
            res.status(responce.status).json(responce.result);
        })
        .catch(err => {
            console.log('get error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        })
});

router.get('/:id/comments/:idComment', (req, res) => {

    if (!validate().isInt(req.params.id) ||
        !validate().isInt(req.params.idComment)){
        res.status(400).send()
    }
    commentDB.get({
        id: parseInt(req.params.idComment),
        to_event: parseInt(req.params.id)
        })
        .then(responce => {
            res.status(responce.status).json(responce.result);
        })
        .catch(err => {
            console.log('get error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        });
});

router.post('/:id/comments', (req, res) => {
    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    commentDB.post(parseInt(req.params.id), req.body)
        .then(responce => {
            res.status(responce.status)
                .send('GET /api/events/'+ req.params.id + "/comments/" + responce.result);
        })
        .catch(err => {
            console.log('post error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        });
});

router.patch('/:id/comments/:idComment', (req, res) => {

    if (!validate().isInt(req.params.id) ||
        !validate().isInt(req.params.idComment)){
        res.status(400).send()
    } else {
        commentDB.get({
            id: parseInt(req.params.idComment),
            to_event: parseInt(req.params.id)
        })
        .then(responce => {
            if (responce.from !== req.session.id){
                res.status(403).send('this isn\'t your message')
            } else {
                return commentDB.patch(
                    parseInt(req.params.idComment),
                    {content: req.body.content})
            }
        })
    }
});

module.exports = router;