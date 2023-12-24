const timeStampMiddleware = (req, res, next) => {
  const date = new Date();
  console.log(`API: ${req?.originalUrl}`);
  console.log(`Time: ${date.toUTCString()}`);
  next();
};

module.exports = {
  timeStampMiddleware,
};
