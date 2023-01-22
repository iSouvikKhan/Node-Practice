const express = require('express');

const cookieParser = require("cookie-parser");

const app = express();
const port = 8000;

const db = require("./config/mongoose");

app.use(express.urlencoded());
app.use(cookieParser());

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// extract style and scripts fom sub pages into the layout
app.set("layout extractStyles", true); // it places the indivudial link tag below the layout link tag or overrides it
app.set("layout extractScripts", true); // same for script tag
// if u don't write above two lines, 


app.use(express.static("./assets"));


// use express router
app.use('/', require('./routes/index'));


// view engine
app.set("view engine", "ejs");
app.set("views", "./views");


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});
