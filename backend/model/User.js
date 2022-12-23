const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please Set Your User Name"],
    },
    password: {
      type: String,
      required: [true, "Please Set Your User Name"],
    },
    email: {
      type: String,
      required: [true, "Please Set Your User Name"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
