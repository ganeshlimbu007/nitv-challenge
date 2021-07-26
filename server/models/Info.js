const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'must have name'],
  },
  image: {
    type: String,
    trim: true,
    required: [true, 'must have image'],
  },
  gender: {
    type: String,
    trim: true,
    required: [true, 'must have gender'],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'must have phone number'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'must have email'],
  },
  nationality: {
    type: String,
    trim: true,
    required: [true, 'must have nationality'],
  },
  dob: {
    type: String,
    trim: true,
    required: [true, 'must have date of birth'],
  },
  educationBackground: [
    {
      education: {
        type: String,
      },
    },
  ],
  preferredModeOfContact: {
    type: String,
    trim: true,
    required: [true, 'must provide preferred mode of contact'],
  },
});
const Info = mongoose.model('Info', infoSchema);
module.exports = Info;
