const express = require('express');
const google = require('googleapis');
const Promise = require('bluebird');

const router = express.Router();

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(process.env.SALINIA_GOOGLE_CLIENT_ID, process.env.SALINIA_GOOGLE_CLIENT_SECRET, '');

const getToken = Promise.promisify(oauth2Client.getToken, { context: oauth2Client });
const people = Promise.promisify(google.plus('v1').people.get, { context: google });

router.post('/login', (req, res, next) => {
  const token = getToken(req.body.auth_code)
    .then((tokens) => {
      oauth2Client.setCredentials(tokens);
      return people({
        userId: 'me',
        auth: oauth2Client,
      });
    })
    .then((result) => {
      console.log('image url', result.image.url.substring(0, result.image.url.lastIndexOf('.') + 4));
      res.send({ status: 'success' });
    })
    .catch(() => res.send({ status: 'failed' }));
  return token;
});

module.exports = router;
