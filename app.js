// build dependencies:

let express = require("express");
let bodyParser = require('body-parser');
let http = require("http");
let db_utils = require("./db/db_utils.js");

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

app.get('/', function (req, res) {

    res.render('user_log', {url: "http://localhost:3000/"});
});

app.get('/log_in', (req, res) => {

    res.send("get => email: " + email + "passwd: " + passwd);
});

app.post('/log_in', function (req, res) {


    const email = req.body.email;
    const passwd = req.body.passwd;
    responce_requette_bd = db_utils.dbquery.exist("user", {'key': "email", "value": email});
    res.send([req.body, responce_requette_bd]);
});


// Start
http.createServer(app).listen(3000);