const express = require("express");
const router = express.Router();
const locationDB = require('../../db/location');
const validate = require('../../lib/validate');

router.get('/:id', (req, res) => {

    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    } else {
        locationDB.get({id: parseInt(req.params.id)})
            .then(result => {
                res.status(result.status).json(result)
            })
    }
});

router.post('/', (req, res) => {

    locationDB.post(req.body.id, req.body)
        .then(responce => {
            res.status(responce.status).json(responce.result)
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        });
});

router.post('/:id/sports/:idSport', (req, res) => {

    if (!validate().isInt(req.params.id) ||
        !validate().isInt(req.params.idSport)){
        res.status(400).send()
    } else {
        locationDB.get({id: parseInt(req.params.id)})
            .then(responce => {
                if (responce.status !==200) {
                    res.status(responce.status).json(responce.result)
                } else {
                    if (!responce.sport_available) {
                        res.status(500).send("internal error");
                    } else {
                        responce.result.sport_available.push(parseInt(req.params.idSport));
                        return locationDB.patch(
                            req.params.id,
                            {sport_available: responce.result.sport_available});
                    }
                }
            })
            .then(responce => {
                res.status(responce.status)
                    .send('GET /api/locations/'+ req.params.id)
            })
            .catch(err =>   {
                console.log('post error: ' + JSON.stringify(err.message));
                res.status(500).send('internal error')
            })
    }
});

router.patch('/:id/', (req, res) => {
    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    locationDB.patch(req.params.id, req.body)
        .then(responce => {
            res.status(responce.status)
                .send('GET /api/location/'+ req.params.id);
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        })
});

router.delete('/:id/sports/:idSports', (req, res) => {
    if (!validate().isInt(req.params.id) ||
        !validate().isInt(req.params.idSports)){
        res.status(400).send()
    } else {
        locationDB.get({id: parseInt(req.params.id)})
            .then(responce =>  {
                if (!parseInt(responce.result.id) && parseInt(responce.result.id) !== 0){
                    res.status(400).send('the id your refering to doesn\'t exist')
                } else {
                    let newSport =  responce.result.sport_available.filter((value) => {
                        return parseInt(value) !== parseInt(req.params.idSports)
                    });
                    return locationDB.patch(
                        parseInt(req.params.id),
                        {sport_available: newSport})
                }
            })
            .then(responce => {
                res.status(responce.status).send()
            })
            .catch(err => {
                console.log('post get error: ' + JSON.stringify(err.message));
                res.status(500).send('internal error')
            })
    }
});

router.delete('/:id', (req, res) => {

    if (!validate().isInt(req.params.id)){
        res.status(400).send()
    }
    locationDB.delete(parseInt(req.params.id))
        .then(responce => {
            res.status(responce.status).send()
        })
        .catch(err => {
            console.log('delete error: ' + JSON.stringify(err.message));
            res.status(500).send('internal error')
        })
});

module.exports = router;