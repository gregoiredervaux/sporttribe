// build dependencies:

const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const validate  = require ('./lib/validate');
const init = require('./db/init');
// build the app
const app = express();

// config views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

// config static content

app.use(express.static(__dirname + '/public'));

// config form

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, "public")));



//routes
const index = require("./routes/index");
const event = require("./routes/event");
const group = require("./routes/group");
const login = require("./routes/login");
const profil = require("./routes/profil");

const api = {
    group: require("./routes/api/group"),
    message: require("./routes/api/messag"),
    event: require("./routes/api/event"),
    profil: require("./routes/api/profil"),
    sport: require("./routes/api/sport"),
    location: require("./routes/api/location"),
};

//authentification
/*
app.use(cookieParser());
app.use((req, res, next) => {

    if (req.cookie('sessionToken')){
        (auth.checkToken(req))? next() : auth.resetConnexion(res);
    } else if(req.body.email && req.body.encrypted_password){
        (auth.checkPassword(
            req.body.email,
            req.body.encrypted_password))? next(): auth.resetConnexion(res);
    } else {
        auth.resetConnexion(res);
    }
    next();
});
*/
// initialize the session
app.use(session({
    secret: 'sporttribe5805',
    resave: false,
    saveUninitialized: true,
    id: 1,
    group: 1,
    cookie: { secure: false }
}));

//on valide les données d'entrée

app.use((req, res, next) => {
   validate().allInput(req);
   next();
});

app.use("/api/groups", api.group);
app.use("/api/messages", api.message);
app.use("/api/events", api.event);
app.use("/api/profiles", api.profil);
app.use("/api/sports", api.sport);
app.use("/api/locations", api.location);

app.use("/login", login);
app.use("/group", group);
app.use("/event", event);
app.use("/profil", profil);
app.use("/", index);


// catch 404 and forward to error handler
app.use((req, res, next)=> {
    console.log("url: " + req.url);
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error", err);
});

module.exports = app;
