const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp); // using "-" is known as kebab case
router.get('/sign-in', usersController.signIn);

router.post("/create", usersController.create);


module.exports = router;