const express = require("express");
const router = express.Router();
const utils = require('../../lib/routes_utils');
const sportDB = require('../../db/sport');

router.get('/:id', (req, res) => {

    sportDB.get({id: parseInt(req.params.id)})
        .then(result => {
            res.status(result.status).json(result.result[0])
        })
});

router.get("/", (req, res) => {

    sportDB.get()
        .then(result => {
            res.status(result.status).json(result.result)
        })
});

module.exports = router;