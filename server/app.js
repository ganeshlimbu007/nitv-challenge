const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

const authRoute = require('./routes/authRoute');
const infoRoute = require('./routes/infoRoute');
const AppError = require('./utils/appError');
const globalErrorController = require("./controllers/errorController");

const app = express();
app.use(cors())

app.use(bodyParser.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true
}));


//route
app.use('/api/signin', authRoute);
app.use('/api/users', infoRoute);


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorController);

module.exports = app;