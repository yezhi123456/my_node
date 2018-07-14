const path = require("path");
const http = require("http");
const captchapng = require("captchapng");
const dbtool = require(path.join(__dirname, "../tools/dbtool"));
module.exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};
module.exports.getVcodeImg = (req, res) => {
  const random = parseInt(Math.random() * 9000 + 1000);
  req.session.vcode = random;
  let p = new captchapng(80, 30, random); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  let img = p.getBase64();
  let imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  res.end(imgbase64);
};
module.exports.getRegister = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
};
module.exports.Register = (req, res) => {
  let { userName } = req.body;
  let messageData = { status: 0, message: "注册成功" };
  dbtool.findOne("userInfo", { userName }, (err, docs) => {
    if (docs != null) {
      messageData = { status: 1, message: "账号存在" };
      res.json(messageData);
    } else {
      dbtool.insertOne("userInfo", req.body, (err, result) => {
        if (result != null) {
          res.json(messageData);
        } else {
          messageData = { status: 2, message: "注册失败" };
          res.json(messageData);
        }
      });
    }
  });
};
module.exports.getstudentManagerPage = (req, res) => {
  let { userName, password, vcode } = req.body;
  let result = { status: 0, message: "登录成功" };
  if (vcode != req.session.vcode) {
    result.status = 1;
    result.message = "验证码错误";
    res.json(result);
    return;
  }
  dbtool.findOne("userInfo", { userName, password }, (err, doc) => {
    if (doc) {
      res.json(result);
    } else {
      result.status = 2;
      result.message = "用户或者验证码错误";
      res.json(result);
    }
  });
};
