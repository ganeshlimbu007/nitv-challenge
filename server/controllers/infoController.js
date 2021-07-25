const mongoose = require('mongoose');
const Info = mongoose.model('Info');

const ApiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getInfo = catchAsync(async (req, res, next) => {
  const info = await Info.findOne({ userId: req.user._id });

  if(req.user._id && !info) {
  return  res.status(200).json({
        status: 'Update info!!!',
        msg: `hello there! ${req.user.name}`
      });
  }

  res.status(200).json({
    status: 'Great Success!!!',
    data: {
      info,
    },
  });
});

exports.postInfo = catchAsync(async (req, res, next) => {
  const {
    name,
    image,
    gender,
    phone,
    email,
    nationality,
    dob,
    educationBackground,
    preferredModeOfContact,
  } = req.body;

  const newInfo = new Info({
    name,
    image,
    gender,
    phone,
    email,
    nationality,
    dob,
    educationBackground,
    preferredModeOfContact,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      info: newInfo,
    },
  });
});

exports.updateInfo = catchAsync(async (req, res, next) => {
  const info = await Info.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!info) {
    return next(new AppError('No tour with that id', 404));
  }

  res.status(200).json({
    status: 'updated!!!',
    data: {
      info,
    },
  });
});

exports.deleteInfo = catchAsync(async (req, res, next) => {
  const info = await Info.findByIdAndDelete(req.user._id);
  if (!info) {
    return next(new AppError('No tour with that id', 404));
  }
  res.status(204).json({
    status: 'Great Success!!!',
    data: null,
  });
});
