const { response } = require("express");

const createUser = (req, res = response /* to get the intellisence */) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "register",
    name,
    email,
    password,
  });
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
