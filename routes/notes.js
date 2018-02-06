const express = require('express');
const NoteController = require('../controller/NoteController');
const ServiceResponse = require('../formatter/ServiceResponse');

const router = express.Router();

router.get('/', NoteController.getListNote, ServiceResponse);

router.post('/', NoteController.addNewNote, ServiceResponse);

module.exports = router;
