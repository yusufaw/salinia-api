const express = require('express');
const router = express.Router();
const google = require('googleapis');
const config = require('../.config');

const plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.google.client_id, config.google.client_secret, '');

router.post('/login', function(req, res, next) {
  return oauth2Client.getToken(req.body.auth_code, (err, tokens) => {
    if(err) {
      console.log(err);
      res.send({
        status: 'failed'
      });
      return;
    }
    oauth2Client.setCredentials(tokens);
    return plus.people.get({
        userId: 'me',
        auth: oauth2Client,
      }, (errr, result) => {
        if(errr) {
          res.send({
            status: 'failed'
          });
          return;
        }
        console.log(result);
        res.send({
          status: 'success'
        })
      });
  });
});

module.exports = router;
