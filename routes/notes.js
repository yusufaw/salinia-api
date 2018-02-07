const express = require('express');
const NoteController = require('../controller/NoteController');
const ServiceResponse = require('../formatter/ServiceResponse');
const TokenService = require('../middleware/TokenService');

const router = express.Router();

router.get('/', TokenService.decode, NoteController.getListNote, ServiceResponse);

router.post('/', NoteController.addNewNote, ServiceResponse);

module.exports = router;
