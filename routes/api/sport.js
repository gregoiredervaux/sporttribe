const express = require("express");
const router = express.Router();
const sportDB = require('../../db/sport');
const validate = require('../../lib/validate');

router.get('/:id', (req, res) => {

    if (validate().isInt(req.params.id)){
        res.status(400).send()
    }
    sportDB.get({id: parseInt(req.params.id)})
        .then(result => {
            res.status(result.status).json(result.result[0])
        })
});

router.get("/", (req, res) => {

    if (validate().isInt(req.params.id)){
        res.status(400).send()
    }
    sportDB.get()
        .then(result => {
            res.status(result.status).json(result.result)
        })
});

module.exports = router;