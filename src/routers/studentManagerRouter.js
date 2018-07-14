const express = require("express");
const router = express.Router();
const path = require("path");
const studentManagerCTRL = require(path.join(
  __dirname,
  "../controllers/studentManagerCTRL.js"
));
router.get("/list", studentManagerCTRL.getList);
router.get("/add", studentManagerCTRL.getAddPage);
router.get("/loginOut", studentManagerCTRL.loginOut);
router.get("/edit/:studentId", studentManagerCTRL.geteditData);
router.get("/delete/:studentId", studentManagerCTRL.toDeleteOne);
router.post("/add", studentManagerCTRL.addUserInfo);
router.post("/edit/:studentId", studentManagerCTRL.updataSudentInfo);
module.exports = router;
