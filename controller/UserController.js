const google = require('googleapis');
const Promise = require('bluebird');
const UserService = require('../service/UserService');

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(process.env.SALINIA_GOOGLE_CLIENT_ID, process.env.SALINIA_GOOGLE_CLIENT_SECRET, '');

const getToken = Promise.promisify(oauth2Client.getToken, { context: oauth2Client });
const people = Promise.promisify(google.plus('v1').people.get, { context: google });

function UserController() {
  const login = (req, res, next) => {
    getToken(req.body.auth_code)
      .then((tokens) => {
        oauth2Client.setCredentials(tokens);
        return people({
          userId: 'me',
          auth: oauth2Client,
        });
      })
      .then((result) => {
        // console.log('result', result);
        const data = {
          first_name: result.name.givenName,
          last_name: result.name.familyName,
          email: result.emails[0].value,
        };
        return UserService.getByEmail(data.email)
          .then((k) => {
            if (k) {
              return k;
            }
            return (UserService.addUser(data));
          });
      })
      .then((d) => {
        req.data = d;
        return next();
      })
      .catch(() => {
        next();
      });
  };

  return { login };
}

module.exports = UserController();
