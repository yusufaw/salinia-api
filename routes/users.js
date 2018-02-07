const express = require('express');
const UserController = require('../controller/UserController');
const ServiceResponse = require('../formatter/ServiceResponse');
const TokenService = require('../middleware/TokenService');

const router = express.Router();

router.post('/login', UserController.login, TokenService.encode, ServiceResponse);

module.exports = router;
