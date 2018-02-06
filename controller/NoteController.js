const NoteService = require('../service/NoteService');

function NoteController() {
  const getListNote = async (req, res, next) => {
    const params = {
      limit: parseInt(req.query.limit, 10) || 10,
      page: parseInt(req.query.page, 10) || 1,
      sort: '-created_at',
    };
    const result = await NoteService.listNote(params);
    params.total = result.total;
    req.pagination = params;
    req.data = result.docs;
    return next();
  };

  const addNewNote = async (req, res, next) => {
    const result = await NoteService.addNote({ content: req.body.content });
    req.data = result;
    return next();
  };

  return {
    getListNote,
    addNewNote,
  };
}

module.exports = NoteController();
