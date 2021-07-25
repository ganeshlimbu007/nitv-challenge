router.post('/signin', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(422).send('Name and/or Password  must be provided');
  }

  const user = await User.findOne({ email });

  if (!user) {
    // if user does not exist just sign up and sign in
    try {
      const user = new User({ name, password });

      await user.save();
      const token = jwt.sign({ userId: user._id }, 'PASS_ME');
      res.send({ token: token });
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  // if user exist see if password matches and sign in

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'HELLO_THERE');
    res.send({ token: token });
  } catch (err) {
    return res.status(422).send('Password invalid!');
  }
});
