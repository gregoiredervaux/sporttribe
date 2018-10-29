// build dependencies:

let express = require("express");
let http = require("http");

// build the app
let app = express();
app.set("views", __dirname + "/app/views");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/app/assets', express.static(__dirname + '/app/assets'));


//routes

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/about', function (req, res) {
    res.render('about.html')
});

app.get('/user_account', function(req, res){
    res.render('user_account')
});

app.get('/new_groups', function(req, res){
    res.render('groups')
});

// Start
http.createServer(app).listen(3000);