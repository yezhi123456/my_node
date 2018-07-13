const express = require("express");
const router = express.Router();
const path = require("path");
const accountRouter = require(path.join(
  __dirname,
  "../controllers/accountCtrl"
));
router.get("/login", accountRouter.getLoginPage);
router.get("/vcodeImg", accountRouter.getVcodeImg);
router.get("/register", accountRouter.getRegister);
router.post("/register", accountRouter.Register);
module.exports = router;
