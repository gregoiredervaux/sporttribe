// build dependencies:

let express = require("express");
let bodyParser = require('body-parser');
let http = require("http");
let db_utils = require("./db/db_utils.js");
let gestion_login = require("./lib/gestion_login.js");

// build the app
let app = express();

// config views
app.set('view engine', 'ejs');
app.set('views', './views');

// config static content

app.use(express.static(__dirname + '/public'));

// config form

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//routes


//dans un premier temps on vérifie que l'utilisateur est logé



// en suite, on l'aiguille
app.get('/', function (req, res) {

    res.render('user_log', {
        url: "http://localhost:3000/",
        ls_msg: [{
            "class": "error_msg",
            "value": ""
        }]
    });
});

app.get('/log_in', (req, res) => {

    res.render('user_log', {
        url: "http://localhost:3000/",
        ls_msg: [{
            "class": "error_msg",
            "value": "vous n etes pas logué"
        }]
    })
});

app.post('/log_in', function (req, res) {

    const email = req.body.email;
    const passwd = req.body.passwd;
    res_req_bd = db_utils.dbquery.exist("user", [{"key": "email", "value": email}, {
        "key": "encrypted_password",
        "value": passwd
    }]);
    if (res_req_bd) {
        res.send([req.body, res_req_bd]);
    } else {
        res.render("user_log", {
            url: "http://localhost:3000/",
            ls_msg: [{
                "class": "error_msg",
                "value": "ce n'est pas le bon user ou pas le bon mot de passe"
            }]
        });
    }
});


// Start
http.createServer(app).listen(3000);