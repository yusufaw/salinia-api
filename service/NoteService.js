const NoteModel = require('../model/NoteModel');

const NoteService = () => {
  const addNote = data => (new NoteModel(data)).save();

  const listNote = params => NoteModel.paginate({}, params);

  return {
    addNote,
    listNote,
  };
};

module.exports = NoteService();
