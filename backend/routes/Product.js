const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/productImage");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4 + Date.now() + path.extname(file.originalname));
  },
});

const allow = (req, file, cb) => {
  const allowType = ["image/jpeg", "image/png", "image/jpg"];
  if (allowType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, allow });

const { add, del, get, upd } = require("../controlers/productControlers");
const protect = require("../middleware/auth");

router.route("/add").post(protect, upload.single("image"), add);
router.route("/get").get(protect, get);
router.route("/del/:id").delete(protect, del);
router.route("/upd/:id").put(protect, upd);

module.exports = router;
