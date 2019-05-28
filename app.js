// build dependencies:
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const validate  = require ('./lib/validate');
const router = express.Router();
const init = require('./db/init');
var passport = require("passport")
    , LocalStrategy = require('passport-local').Strategy
    , BasicStrategy = require('passport-http').BasicStrategy;
//const logger_app = require('./lib/log_app');
//const logger = require('./lib/log_user');
const userDB = require('./db/profil');
// build the app


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

// initialize the session
app.use(session({
    secret: 'sporttribe5805',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use(logger);

passport.use(new LocalStrategy(
    function(username, password, done) {
        userDB.get({email: username})
            .then(responce => {
                console.log("responce.status: " + responce.status);
                console.log("password: " + password);
                console.log("responce.result" + JSON.stringify(responce.result));
                if (responce.status === 404){
                    console.log('unkown email');
                    return done(null, false, { message: 'unkown email'})
                }
                if (responce.result.encrypted_password !== password){
                    console.log('wrong password');
                    return done(null, false, { message: 'wrong password'})
                }
                console.log("that's the good one");
                return done(null, {id: responce.result.id})
            })
            .catch(err => {
                return done(err)
            })
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    done(null, {id: id})
});

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

app.post('/api/login/',
    passport.authenticate('local', {session: true}), (req, res) => {
        //logger_user.info("authentification");
        res.status(200).send()
    }
);

//on authentifie l'auteur
app.use((req, res, next) => {
    console.log("req.isAuthenticated() " + req.isAuthenticated());
    if (!req.isAuthenticated()){
        //logger_user.info("deja authentifié");
        res.status(403).send("not authentificate");
    } else {
        next();
    }
});

//on valide les données d'entrée

app.use((req, res, next) => {
   validate().allInput(req);
   next();
});

app.use("/api/groups", api.group);
app.use("/api/messages", api.message);
app.use("/api/events", api.event);
app.use("/api/users", api.profil);
app.use("/api/sports", api.sport);
app.use("/api/locations", api.location);
app.use("/api/login", login);
app.use("/group", group);
app.use("/event", event);
app.use("/profil", profil);
app.use("/", index);


// catch 404 and forward to error handler
app.use((req, res, next)=> {
    console.log("url: " + req.url);
    const err = new Error("Not Found");
    err.status = 404;
    err.message = "le champs que vous avez renseigner en URL n'existe pas: " + req.url;
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