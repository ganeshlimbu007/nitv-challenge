module.exports = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'localhost'); //replace localhost with actual host
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, PUT, PATCH, POST, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, X-Requested-With, Authorization'
  );

  next();
};
