const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createUser = async (
  req,
  res = response /* to get the intellisence */
) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log("🚀 ~ file: auth.js:13 ~ user", user);

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "The user email already exists",
      });
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    console.log("🚀 ~ file: auth.js:27 ~ user", user);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error saving the user, please reach out the db admin",
    });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const revalidateToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  loginUser,
  createUser,
  revalidateToken,
};
