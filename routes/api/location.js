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

router.post('/', (req, res) => {

});

router.put('/:id/sports/:id_sports', (req, res) => {

});

router.patch('/:id/', (req, res) => {

});

router.delete('/:id/sports/:id_sports', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;