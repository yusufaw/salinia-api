const express = require('express');
const router = express.Router();
const LogService = require('../service/LogService');

router.get('/', function(req, res, next) {
  LogService.listLog()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

router.post('/', function(req, res, next) {
  console.log(req.body.content);
  let log = {
    'added_at': new Date(),
    'content': req.body.content
  };
  LogService.addLog(log)
    .then(result => {
      res.send('Success : ' + log.added_at);
    })
    .catch(err => {
      res.send('Error:' + err.message);
    })
});

module.exports = router;
