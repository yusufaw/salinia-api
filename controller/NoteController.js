const NoteService = require('../service/NoteService');

function NoteController() {
  const getListNote = (req, res, next) => {
    const params = {
      limit: parseInt(req.query.limit, 10) || 10,
      page: parseInt(req.query.page, 10) || 1,
      sort: '-created_at',
    };
    NoteService.listNote(params)
      .then((result) => {
        params.total = result.total;
        req.pagination = params;
        req.data = result.docs;
        return next();
      })
      .catch(err => next(err));
  };

  const addNewNote = (req, res, next) => {
    NoteService.addNote({ content: req.body.content })
      .then((result) => {
        req.data = result;
        return next();
      })
      .catch(err => next(err));
  };

  return {
    getListNote,
    addNewNote,
  };
}

module.exports = NoteController();
