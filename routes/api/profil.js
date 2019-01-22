const express = require("express");
const router = express.Router();
const userDB = require('../../db/profil');
const validate = require('../../lib/validate');

router.get('/:id', (req, res) => {

    if (!validate.isInt(req.params.id)){
        res.status(400).send()
    }

    userDB.get({id: parseInt(req.params.id)})
        .then(responce => {
            if (responce.result.groupe_id !== req.session.group){
                res.status(403)
                    .json("vous n'avez pas accès a cet utilisteur, vous ne faites pas parti de son groupe")
            }
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

router.patch('/:id/', (req, res) => {

    if (!validate.isInt(req.params.id)){
        res.status(400).send()
    } else if (parseInt(req.params.id) !== req.session.id){
        res.status(403).json("vous n'est pas cette personne")
    }
    evenDB.patch(req.params.id, req.body)
        .then(responce => {
            res.status(responce.status)
                .send('GET /api/user/'+ toString(req.params.id));
        })
        .catch(err => {
            console.log('post get error: ' + JSON.stringify(err));
            res.status(500).send('internal error')
        })
});

module.exports = router;