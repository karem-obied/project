const express = require("express");
const router = express.Router();

const { reg, login, del } = require("../controlers/userControlers");

router.route("/reg").post(reg);
router.route("/login").post(login);
router.route("/del/id").delete(del);

module.exports = router;
