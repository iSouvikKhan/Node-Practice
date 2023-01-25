const express = require('express');
const router = express.Router();
const passport = require("passport");

const usersController = require('../controllers/users_controller');

// router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp); // using "-" is known as kebab case
router.get('/sign-in', usersController.signIn);

router.post("/create", usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

// router.get("/sign-out", (req, res) => {
//     req.logout();
//     res.redirect("/");
// });

module.exports = router;