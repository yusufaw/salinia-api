const jwt = require('jsonwebtoken');

function TokenService() {
  const encode = (req, res, next) => {
    req.data.token = jwt.sign({ data: { user_id: req.data.id } }, 'sssh');
    return next();
  };

  const decode = (req, res, next) => {
    try {
      const payload = jwt.verify(req.headers.authorization, 'sssh');
      req.user = { id: payload.data.user_id };
      return next();
    } catch (e) {
      return next(e);
    }
  };

  return { encode, decode };
}

module.exports = TokenService();
