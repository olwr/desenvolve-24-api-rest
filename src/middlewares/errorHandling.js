import mongoose from 'mongoose';
import BaseError from '../errors/BaseError.js';
import IncorrectRequest from '../errors/IncorrectRequest.js';
import ValidationError from '../errors/ValidationError.js';

/* 
TODO: refactor to switch case
*/
// eslint-disable-next-line no-unused-vars
function errorHandling(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new IncorrectRequest().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res);
  } else if (err instanceof BaseError) {
    err.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
};

export default errorHandling;