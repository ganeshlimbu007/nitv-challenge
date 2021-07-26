const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/', cors(), async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(422).send('Name and/or Password  must be provided');
  }

  const user = await User.findOne({ name });

  if (!user) {
    // if user does not exist just sign up and sign in
    try {

      console.log('hello there sign up')
      const user = new User({ name, password });

      await user.save();
      const token = jwt.sign({ userId: user._id }, 'PASS_ME');
      return res.send({ token: token, message: 'Welcome new user', isLoggedIn: true });
    } catch (err) {
      console.log('hello there sign up error', err)
      return res.status(422).send(err.message);
    }
  } else {
    // if user exist see if password matches and sign in

    try {
      console.log('hello there sign in')
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, 'PASS_ME');
      res.send({ token: token, message: 'Welcome Back!', isLoggedIn: true });
    } catch (err) {
      console.log('hello there sign in error', err)
      return res.status(422).send('Password invalid!');
    }
  }
});

module.exports = router;
