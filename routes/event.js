const express = require("express");
const router = express.Router();
const utils = require('../lib/routes_utils');

router.get("/", (req, res) => {
    res.render("index", {
        title: "Evenement",
        message: {
            title: "bien joué",
            class: "success",
            p: "ca fonctionne"
        }
    });
});

module.exports = router;