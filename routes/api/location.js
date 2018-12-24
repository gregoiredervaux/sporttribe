const express = require("express");
const router = express.Router();
const utils = require('../../lib/routes_utils');
const locationDB = require('../../db/location');

router.get('/:id', (req, res) => {

    locationDB.get({id: parseInt(req.params.id)})
        .then(result => {
            res.status(result.status).json(result[0])
        })
});

router.get("/", (req, res) => {

    locationDB.get()
        .then(result => {
            res.status(result.status).json(result.result)
        })
});

module.exports = router;