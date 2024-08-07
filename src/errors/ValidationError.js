import IncorrectRequest from './IncorrectRequest.js';

class ValidationError extends IncorrectRequest {
  constructor(err) {
    const errorMessage = Object.values(err.errors)
      .map(err => err.message)
      .join('; ');

    super(`The following errors were found: ${errorMessage}`);
  }
}

export default ValidationError;