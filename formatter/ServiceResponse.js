const _ = require('lodash');

function ServiceResponse() {
  return (req, res) => {
    let data = [];
    const { pagination } = req;
    if (Array.isArray(req.data)) {
      req.data.forEach(r => data.push(r));
    } else {
      data = req;
    }

    const jsonRes = {
      status: true,
      message: _.get(req.response, 'message', 'OK'),
      meta: {},
      data,
    };

    if (pagination) {
      jsonRes.meta.pagination = {
        page: parseInt(pagination.page, 10),
        limit: parseInt(pagination.limit, 10),
        total: parseInt(pagination.total, 10),
        pages: parseInt(pagination.pages, 10),
      };
    }

    res.status(_.get(req.response, 'code', 200));
    res.json(jsonRes);
  };
}

module.exports = ServiceResponse();
