const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (
  req,
  res = response /* to get the intellisence */
) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

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

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log("🚀 ~ file: auth.js:40 ~ error", error);
    res.status(500).json({
      ok: false,
      msg: "Error saving the user, please reach out the db admin",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User or password incorrect",
      });
    }

    // Check passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrect",
      });
    }

    // Ready to generate JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error saving the user, please reach out the db admin",
    });
  }
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
