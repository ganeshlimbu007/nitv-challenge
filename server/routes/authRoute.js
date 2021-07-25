const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(422).send('Name and/or Password  must be provided');
  }

  const user = await User.findOne({ name });

  if (!user) {
      // if user does not exist just sign up and sign in
    try {
      const user = new User({ name, password });

      await user.save();
      const token = jwt.sign({ userId: user._id }, 'PASS_ME');
      res.send({ token: token, message: 'Welcome new user' });
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

   // if user exist see if password matches and sign in

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'PASS_ME');
    res.send({ token: token, message: 'Welcome Back!'  });
  } catch (err) {
    return res.status(422).send('Password invalid!');
  }
});

module.exports = router;
