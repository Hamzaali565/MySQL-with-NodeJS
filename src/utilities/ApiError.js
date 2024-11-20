class ApiError extends Error {
  constructor(
    status,
    message = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.status = status;
    this.error = error;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this.constructor, constructor);
    }
  }
}

export { ApiError };
