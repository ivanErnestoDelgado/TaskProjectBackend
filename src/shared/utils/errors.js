const HTTP_STATUS=require('../constants/httpStatusCodes')

class HttpError extends Error {
  constructor(message, status = HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    super(message);
    this.status = status;
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'Not found') {
    super(message, HTTP_STATUS.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

class BadRequestError extends HttpError {
  constructor(message = 'Invalid request', errors = null) {
    super(message, HTTP_STATUS.BAD_REQUEST);
    this.name = 'BadRequestError';
    if (errors) this.errors = errors; // soporte para detalles extra
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, HTTP_STATUS.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden resource') {
    super(message, HTTP_STATUS.FORBIDDEN);
    this.name = 'ForbiddenError';
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError
};
