// require the library
const mongoose = require('mongoose');

// connect to the db
mongoose.connect("mongodb://127.0.0.1/codeial_development"); // 127.0.0.1 instead of localhost for present version of Node

// acquire the connection ( to check whether it is successful or not )
const db = mongoose.connection; // connection between mongoose and database

// error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running then print the message
db.once("open", function () {
    console.log("Successfully connected to db :: Mongo DB");
})

module.exports = db;