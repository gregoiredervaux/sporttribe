const express = require("express");
const router = express.Router();
const messageDB = require ('../../db/messag');
const validate = require('../../lib/validate');

router.get("/to/:idTo/from/:idFrom", (req, res) => {
    if (!validate().isInt(req.params.idTo) ||
        !validate().isInt(req.params.idFrom)) {
        res.status(400).send()
    } else if (parseInt(req.params.idForm) !== res.session.id &&
        parseInt(req.params.idTo) !== res.session.id) {
        res.status(403).send("Vous n'etes pas cette personne")
    } else {
        messageDB.get({
            to: parseInt(req.params.idTo),
            from: parseInt(req.params.idFrom)
            })
            .then(responce => {
                res.status(responce.status).json(responce.result)
            })
    }
});

router.post('/', (req, res) => {

    messageDB.post(req.body.id, req.body)
        .then(responce => {
            res.status(responce.status).json(responce.result)
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        });
});

module.exports = router;