const NoteModel = require('../model/NoteModel');

const NoteService = () => {
  const addLog = (data) => {
    const addLogPromise = new Promise((resolve, reject) => {
      const dt = new NoteModel(data);
      dt.save()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
    return addLogPromise;
  };

  const listLog = (params) => {
    const listLogPromise = new Promise((resolve, reject) => {
      NoteModel.paginate({}, params)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });

    return listLogPromise;
  };

  return {
    addLog,
    listLog,
  };
};

module.exports = NoteService();
