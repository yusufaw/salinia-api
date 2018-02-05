const express = require('express');
const UserController = require('../controller/UserController');
const ServiceResponse = require('../formatter/ServiceResponse');

const router = express.Router();

router.post('/login', UserController.login, ServiceResponse);

module.exports = router;
