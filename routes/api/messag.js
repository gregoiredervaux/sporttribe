const express = require("express");
const router = express.Router();
const utils = require('../../lib/routes_utils');

router.get("/to/:id_to/from/:id_from", (req, res) => {
    res.render("index", {
        title: "Profile",
        message: {
            title: "bien joué",
            class: "success",
            p: "ca fonctionne"
        }
    });
});

router.post('/', (req, res) => {


});

module.exports = router;