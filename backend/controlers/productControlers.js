const Product = require("../model/Product");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");

const add = asyncHandler(async (req, res) => {
  const { name, qty, price } = req.body;
  const image = req.file.filename;
  const user = await User.findById(req.user);
  if (!user) {
    res.status(401);
    throw new Error("User Not Authed");
  }
  if (name && qty && price && image) {
    const product = await Product.create({
      owner: req.user,
      name,
      qty,
      price,
      image,
    });
    res.status(200).json({
      user: req.user._id,
      name,
      qty,
      price,
      image,
      _id: product._id,
    });
  } else {
    res.status(400);
    throw new Error("Please Fill All The Inputs");
  }
});
const get = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("User Does Not Exist");
  }
  const products = await Product.find({ user: req.user._id });
  res.status(200).json(products);
});
const del = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("User Does Not Exist");
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("No Prodyct");
  }
  if (product) {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  }
});
const upd = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("User Does Not Exist");
  }
  const { qty, name, price, image } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product Does Not Exist");
  }
  await Product.findByIdAndUpdate(req.params.id, {
    _id: product._id,
    name: name !== "" ? name : product.name,
    image: image !== "" ? image : product.image,
    price: price !== 0 ? price : product.price,
    qty: qty !== 0 ? qty : product.qty,
    user: req.user._id,
  });
});
const productControlers = {
  add,
  get,
  del,
  upd,
};
module.exports = productControlers;
