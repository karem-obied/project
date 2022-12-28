const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Put A Name For Your Product"],
    },
    qty: {
      type: Number,
      required: [true, "Please Put A Quantity For Your Product"],
    },
    price: {
      type: Number,
      required: [true, "Please Put A Price For The Product"],
    },
    image: {
      type: String,
      required: [true, "Please Put A Price For The Product"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", ProductSchema);
