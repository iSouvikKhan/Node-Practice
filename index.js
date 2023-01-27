const express = require('express');

const env = require('./config/environment');

const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;

const db = require("./config/mongoose");

const session = require("express-session");
const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require('./config/passport-jwt-strategy');

const MongoStore = require('connect-mongo')(session);

// const sassMiddleware = require("node-sass-middleware");

const flash = require("connect-flash");

const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path = require("path");


// app.use(sassMiddleware({
//     src: path.join(__dirname, env.asset_path, 'scss'),
//     dest: path.join(__dirname, env.asset_path, 'css'),
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// })); // I am putting this just before the server is started, server need those precompiled files before it starts


app.use(express.urlencoded());
app.use(cookieParser());

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// extract style and scripts fom sub pages into the layout
app.set("layout extractStyles", true); // it places the indivudial link tag below the layout link tag or overrides it
app.set("layout extractScripts", true); // same for script tag
// if u don't write above two lines, 


// app.use(express.static(env.asset_path));
app.use(express.static("./assets"));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// use express router
// app.use('/', require('./routes/index')); // routes have to be placed below the middlewares


// view engine
app.set("view engine", "ejs");
app.set("views", "./views");


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    // secret: env.session_cookie_key,
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);


// use express router
app.use("/", require("./routes"));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});
