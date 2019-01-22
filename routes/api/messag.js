const express = require("express");
const router = express.Router();
const messageDB = require ('../../db/messag');
const validate = require('../../lib/validate');

router.get("/to/:id_to/from/:idFrom", (req, res) => {
    if (!validate.isInt(req.params.id)){
        res.status(400).send()
    } else if (req.session.id !== req.params.id &&
                req.session.id !== req.params.idFrom) {
        res.status(403).json('vous n\'est pas cet personne')
    }

    userDB.get({id: parseInt(req.params.id)})
        .then(responce => {
            res.status(responce.status).json(responce.responce)
        })
});

router.post('/', (req, res) => {

    userDB.post(req.body.id, req.body)
        .then(responce => {
            res.status(responce.status).json(responce.result)
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err));
            res.status(500).send('internal error')
        });
});

module.exports = router;