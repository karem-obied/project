const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const reg = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (userName && email && password) {
    const exist = await User.findOne({ email });
    if (exist) {
      res.status(400);
      throw new Error("This Email Is Used Before This Time Try Another One");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = await User.create({
        userName,
        email,
        password: hash,
      });
      res.status(200).json({
        _id: user._id,
        userName,
        email,
        token: generate(user.id),
      });
    }
  } else {
    res.status(400);
    throw new Error("Please Fill All The Fields");
  }
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (email && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email,
        token: generate(user._id),
      });
    } else {
      if (!email) {
        res.status(400);
        throw new Error("Please Put Your Email");
      } else {
        res.status(400);
        throw new Error("Your Password Is Worng");
      }
    }
  } else {
    res.status(400);
    throw new Error("This Account Does not Exist");
  }
});
const del = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User Does Not Exist");
  } else {
    await user.remove();
    res.status(200).json({ id: req.params.id });
  }
});
const generate = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const userControlers = {
  reg,
  login,
  del,
};
module.exports = userControlers;
