const google = require('googleapis');
const Promise = require('bluebird');
const UserService = require('../service/UserService');

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(process.env.SALINIA_GOOGLE_CLIENT_ID, process.env.SALINIA_GOOGLE_CLIENT_SECRET, '');

const getToken = Promise.promisify(oauth2Client.getToken, { context: oauth2Client });
const people = Promise.promisify(google.plus('v1').people.get, { context: google });

function UserController() {
  const login = async (req, res, next) => {
    const tokens = await getToken(req.body.auth_code);
    oauth2Client.setCredentials(tokens);
    const result = await people({
      userId: 'me',
      auth: oauth2Client,
    });
    const data = {
      first_name: result.name.givenName,
      last_name: result.name.familyName,
      email: result.emails[0].value,
    };
    let user = await UserService.getByEmail(data.email);
    if (!user) user = await (UserService.addUser(data));
    req.data = user.toJSON();
    return next();
  };

  return { login };
}

module.exports = UserController();
