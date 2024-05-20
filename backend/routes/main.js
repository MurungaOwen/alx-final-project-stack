const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersControllers');

router.post('/register', UsersController.RegisterUser) // register new User
module.exports = router;