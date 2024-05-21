const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersControllers');

router.post('/register', UsersController.RegisterUser) // register new User
router.post('/login', UsersController.Login);
module.exports = router;