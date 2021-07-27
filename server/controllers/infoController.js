const mongoose = require('mongoose');
const Info = mongoose.model('Info');

const ApiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getInfo = catchAsync(async (req, res, next) => {
  const userInfos = await Info.find();
  console.log(userInfos);

  res.status(200).json({
    users: userInfos
  });
});

exports.postInfo = catchAsync(async (req, res, next) => {
  const info = await Info.findOne({ userId: req.user._id });

  console.log(info, req.user);
  if (info) {
    return res.status(200).json({
      msg: 'already data present',
    });
  }

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

  await newInfo.save();

  res.status(201).json({
    status: 'success',
    data: {
      info: newInfo,
    },
  });
});

exports.updateInfo = catchAsync(async (req, res, next) => {
  const info = await Info.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!info) {
    return next(new AppError('No user data', 404));
  }

  res.status(200).json({
    status: 'updated!!!',
    data: {
      info,
    },
  });
});

exports.deleteInfo = catchAsync(async (req, res, next) => {
  const info = await Info.findByIdAndDelete(req.params.id);
  if (!info) {
    return next(new AppError('No user data', 404));
  }
  res.status(204).json({
    status: 'Great Success!!!',
    data: null,
  });
});
