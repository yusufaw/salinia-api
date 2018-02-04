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
  return {
    addUser,
  };
};

module.exports = UserService();
