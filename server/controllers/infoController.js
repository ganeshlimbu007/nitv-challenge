const mongoose = require('mongoose');
const Info = mongoose.model('Info');
const cloudinary = require('cloudinary').v2;

const ApiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

cloudinary.config({
  cloud_name: 'dgdb90auq',
  api_key: '138393171933172',
  api_secret: '7W80WYtM4IEtBcfOIjvKhWXASRQ',
});

exports.getInfo = catchAsync(async (req, res, next) => {
  const userInfos = await Info.find();
  console.log(userInfos);

  res.status(200).json({
    users: userInfos,
  });
});

exports.postInfo = catchAsync(async (req, res, next) => {
  const file = req.files.image;
  await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
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

    console.log(typeof educationBackground);

    newInfo = new Info({
      name,
      image: null,
      imageUrl: result.url,
      gender,
      phone,
      email,
      nationality,
      dob,
      educationBackground: JSON.parse(educationBackground),
      preferredModeOfContact,
      userId: req.user._id,
    });
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
  if (req.files) {
    const file = req.files.image;

    if (file) {
      await cloudinary.uploader.upload(
        file.tempFilePath,
        async (err, result) => {
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

          const info = await Info.findByIdAndUpdate(
            req.params.id,
            {
              name,
              image: null,
              imageUrl: result.url,
              gender,
              phone,
              email,
              nationality,
              dob,
              educationBackground: JSON.parse(educationBackground),
              preferredModeOfContact,
            },
            {
              new: true,
              runValidators: true,
            }
          );

          if (!info) {
            return next(new AppError('No user data', 404));
          }

          res.status(200).json({
            status: 'updated!!!',
            data: {
              info,
            },
          });
        }
      );
    }
  } else {
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
    const info = await Info.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image: null,
        gender,
        phone,
        email,
        nationality,
        dob,
        educationBackground: JSON.parse(educationBackground),
        preferredModeOfContact,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!info) {
      return next(new AppError('No user data', 404));
    }

    res.status(200).json({
      status: 'updated!!!',
      data: {
        info,
      },
    });
  }
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
