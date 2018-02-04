const UserModel = require('../model/UserModel');

const UserService = () => {
  const addUser = (data) => {
    const addUserPromise = new Promise((resolve, reject) => {
      const dt = new UserModel(data);
      dt.save()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return addUserPromise;
  };

  const getByEmail = (email) => {
    const user = new Promise((resolve, reject) => {
      UserModel.findOne({ email })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
    return user;
  };
  return {
    addUser,
    getByEmail,
  };
};

module.exports = UserService();
