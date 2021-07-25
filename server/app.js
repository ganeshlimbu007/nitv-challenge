const express = require('express');
const morgan = require('morgan');

const app = express();

//routes

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

module.exports = app;