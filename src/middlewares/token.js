const jwt = require('jsonwebtoken');

module.exports = req => {
    try {
      const token = jwt.verify(req.request.headers.authorization, process.env.JWT_SECRET);
      return token;
    } catch(e) {
      return null;
    }
}