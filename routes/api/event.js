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
    }
    evenDB.get({id: parseInt(req.params.id)})
        .then(responce => {
            if (responce.status !==200) {
                res.status(responce.status).json(responce.result)
            } else {
                if (!responce.players) {
                    console.log('post get error: !responce.players');
                    res.status(500).send("internal error");
                } else {

                    responce.players.push(parseInt(req.params.id_player));
                    return evenDB.patch(
                        req.params.id,
                        {players: responce.players});
                }
            }
        })
        .then(responce => {
            res.status(responce.status)
                .send('GET /api/events/'+ toString(req.params.id))
        })
        .catch(err =>   {
            console.log('post get error: ' + JSON.stringify(err));
            res.status(500).send('internal error')
        })
});

router.post('/', (req, res) => {

    eventDB.post(req, req.body.id, req.body)
        .then(responce => {
            res.status(responce.status).json(responce.result)
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err));
            res.status(500).send('internal error')
        });
});

router.patch('/:id/', (req, res) => {

    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    evenDB.get({id: parseInt(req.params.id)})
        .then(responce => {
            if (responce.captain_id !== req.session.id){
                res.status(403)
                    .send('vous n\'etes pas capitaine de l\'events')
            } else {
                return evenDB.patch(req.params.id, req.body)
            }
        })
        .then(responce => {
            res.status(responce.status)
                .send('GET /api/events/'+ toString(req.params.id));
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err));
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
            if (!parseInt(responce.result.id)){
                res.status(400).send('the id your refering to doesn\'t exist')
            } else {
                delete responce.result.players[toString(idPlayers)];
                return eventDB.patch(
                    parseInt(req.params.id),
                    {players: responce.result.players})
            }
        })
        .then(responce => {
            res.status(responce.status).send()
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err));
            res.status(500).send('internal error')
        })
});

router.delete('/:id', (req, res) => {

    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    evendDB.delete(parseInt(req.params.id))
        .then(responce => {
            res.status(responce.status).send()
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err));
            res.status(500).send('internal error')
        })
});

router.get('/:id/comments', (req, res) => {

    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    commentDB.get({to_event: parseInt(req.params.id)})
        .then(responce => {
            res.status(responce.status.json(responce.result));
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err));
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
            res.status(responce.status.json(responce.result));
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err));
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
                .json(responce.result);
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err));
            res.status(500).send('internal error')
        });
});

router.patch('/:id/comments/:id_comment', (req, res) => {

    if (!validate().isInt(req.params.id) ||
        !validate().isInt(req.params.idComment)){
        res.status(400).send()
    }
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
});

module.exports = router;