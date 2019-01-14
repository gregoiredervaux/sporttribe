const express = require("express");
const router = express.Router();
const utils = require('../../lib/routes_utils');
const userDB = require('../../db/profil');

router.get('/:id', (req, res) => {

    userDB.get({id: parseInt(req.params.id)})
        .then(result => {
            res.status(result.status).json(result.result[0])
        })
});

router.get("/", (req, res) => {

    userDB.get()
        .then(result => {
            res.status(result.status).json(result.result)
        })
});

router.post('/', (req, res) => {

});

router.patch('/:id/', (req, res) => {

});

module.exports = router;