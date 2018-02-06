const NoteModel = require('../model/NoteModel');

const NoteService = () => {
  const addNote = (data) => {
    const addNotePromise = new Promise((resolve, reject) => {
      const dt = new NoteModel(data);
      dt.save()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
    return addNotePromise;
  };

  const listNote = (params) => {
    const listNotePromise = new Promise((resolve, reject) => {
      NoteModel.paginate({}, params)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });

    return listNotePromise;
  };

  return {
    addNote,
    listNote,
  };
};

module.exports = NoteService();
