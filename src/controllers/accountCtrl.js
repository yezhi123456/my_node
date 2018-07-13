const path = require("path");
const http = require("http");
const captchapng = require("captchapng");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "myfirstDatabase";

module.exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};
module.exports.getVcodeImg = (req, res) => {
  let p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha
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
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      const collection = db.collection("userInfo");
      collection.findOne({ userName }, function(err, docs) {
        if (docs != null) {
          messageData = { status: 1, message: "账号存在" };
          client.close();
          res.json(messageData);
        } else {
          collection.insertOne(req.body, function(err, result) {
            if (result != null) {
              client.close();
              res.json(messageData);
            } else {
              messageData = { status: 2, message: "注册失败" };
              client.close();
              res.json(messageData);
            }
          });
        }
      });
    }
  );
};
