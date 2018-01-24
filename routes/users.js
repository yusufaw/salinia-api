const express = require('express');
const router = express.Router();
const google = require('googleapis');
const Promise = require('bluebird');

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(process.env.SALINIA_GOOGLE_CLIENT_ID, process.SALINIA_GOOGLE_CLIENT_SECRET, '');

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
    console.log('image url', result.image.url.substring(0, result.image.url.lastIndexOf('.') + 4));
    res.send({ status: 'success' })
  })
  .catch(err => {
    console.log(err);
    res.send({ status: 'failed' });
  });
});

module.exports = router;
