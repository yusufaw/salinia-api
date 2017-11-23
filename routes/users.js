const express = require('express');
const router = express.Router();
const google = require('googleapis');
const Promise = require('bluebird');
const config = require('../.config');

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.google.client_id, config.google.client_secret, '');

const getToken = Promise.promisify(oauth2Client.getToken, {context: oauth2Client});
const people = Promise.promisify(google.plus('v1').people.get, { context: google });

router.post('/login', function(req, res, next) {
  return getToken(req.body.auth_code)
  .then((tokens) => {
    oauth2Client.setCredentials(tokens);
    return people({
        userId: 'me',
        auth: oauth2Client,
      });
  })
  .then((result) => {
    console.log(result);
    res.send({ status: 'success' })
  })
  .catch(err => {
    console.log(err);
    res.send({ status: 'failed' });
  });
});

module.exports = router;
