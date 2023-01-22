module.exports.home = function (req, res) {

    console.log(req.cookies); // printing cookies in console
    res.cookie("user_id", 25); // settitng up cookies

    // return res.end('<h1>Express is up for Codeial!</h1>')

    return res.render("home", { title: "Home" }); // render() is used for rendering ejs file
}

// module.exports.actionName = function(req, res){}