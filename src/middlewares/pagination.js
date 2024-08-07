import IncorrectRequest from '../errors/IncorrectRequest.js';

async function pagination(req, res, next) {
  try {
    let { limit = 5, page = 1, ordination = '_id:-1'} = req.query;
    let [orderBy, order] = ordination.split(':');

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const paginatedResult = await result.find({})
        .sort({[orderBy]: order})
        .skip((page - 1) * limit)
        .limit(limit);
      res.status(200).json(paginatedResult);
    } else {
      next(new IncorrectRequest());
    }
  } catch (err) {
    next(err);
  }
}

export default pagination;