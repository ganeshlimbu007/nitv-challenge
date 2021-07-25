const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const authRoute = require('./routes/authRoute');
const infoRoute = require('./routes/infoRoute');
const AppError = require('./utils/appError');
const globalErrorController = require("./controllers/errorController");

const app = express();
app.use(bodyParser.json());

//middlewares
app.use(express.json());

//route
app.use('/signin', authRoute);
app.use('/getinfo', infoRoute);


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorController);

module.exports = app;