class HttpError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'Not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

class BadRequestError extends HttpError {
  constructor(message = 'Invalid request', errors = null) {
    super(message, 400);
    this.name = 'BadRequestError';
    if (errors) this.errors = errors; // soporte para detalles extra
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden resource') {
    super(message, 403);
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
