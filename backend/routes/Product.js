const express = require("express");
const router = express.Router();

const { add, del, get, upd } = require("../controlers/productControlers");
const protect = require("../middleware/auth");

router.route("/add").post(protect, add);
router.route("/get").get(protect, get);
router.route("/del/:id").delete(protect, del);
router.route("/upd/:id").put(protect, upd);

module.exports = router;
