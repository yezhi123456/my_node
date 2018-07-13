const express = require("express");
const router = express.Router();
const path = require("path");
const studentManagerCTRL = require(path.join(
  __dirname,
  "../controllers/studentManagerCTRL.js"
));
router.get("/list", studentManagerCTRL.getList);
module.exports = router;
