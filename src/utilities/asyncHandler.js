const asyncHandler = (handleAsync) => {
  return (req, res, next) => {
    Promise.resolve(handleAsync(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
