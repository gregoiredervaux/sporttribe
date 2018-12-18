const express = require("express");
const router = express.Router();
const utils = require('../../lib/routes_utils');
const eventDB = require('../../db/event');

router.get('/:id', (req, res) => {

    eventDB.get({id: parseInt(req.params.id)})
        .then(result => {
            res.status(result.status).json(JSON.parse(event[0]))
        })
});

router.get("/", (req, res) => {

    eventDB.get()
        .then(result => {
            res.status(result.status).json(result.result)
        })
});

module.exports = router;