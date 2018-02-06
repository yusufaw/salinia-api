const UserModel = require('../model/UserModel');

const UserService = () => {
  const addUser = data => (new UserModel(data)).save();

  const getByEmail = email => UserModel.findOne({ email });
  return {
    addUser,
    getByEmail,
  };
};

module.exports = UserService();
