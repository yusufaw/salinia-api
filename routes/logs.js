const express = require('express');
const router = express.Router();
const LogService = require('../service/LogService');

router.get('/', function(req, res, next) {

  let params = {
    limit: parseInt(req.query.limit),
    page: parseInt(req.query.page),
    sort: req.query.sort,
  };
  LogService.listLog(params)
    .then(result => {
      params.total = result.total;
      res.send({
        meta: params,
        data: result.docs
      });
    })
    .catch(err => {
      res.send(err);
    });
});

router.post('/', function(req, res, next) {
  console.log(req.body.content);
  let log = {
    'content': req.body.content
  };
  LogService.addLog(log)
    .then(result => {
      res.send({
        data: result
      });
    })
    .catch(err => {
      res.send('Error:' + err.message);
    })
});

module.exports = router;
