const UserProviderModel = require('../model/UserProviderModel');

const UserProviderService = () => {
  const addUserProvider = (data) => {
    const addUserProviderPromise = new Promise((resolve, reject) => {
      const dt = new UserProviderModel(data);
      dt.save()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return addUserProviderPromise;
  };
  return {
    addUserProvider,
  };
};

module.exports = UserProviderService();
