const User = require('../models/User');

module.exports = async function (req, res, next) {

  if (!req.user) {
    return res.status(401).send({ message: 'Not authorised' });
  }

  const user = await User.findById(req.user.id);

  if (user.role !== 'admin') {
    return res.status(403).send({ message: 'Access reserved for administrators' });
  }

  next();
}


