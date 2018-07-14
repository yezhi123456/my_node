const path = require("path");
const xtpl = require("xtpl");
const dbtool = require(path.join(__dirname, "../tools/dbtool"));
module.exports.getList = (req, res) => {
  let keyword = req.query.keyword || "";
  dbtool.findAll("studentInfo", { name: { $regex: keyword } }, (err, docs) => {
    xtpl.renderFile(
      path.join(__dirname, "../views/list.html"),
      { studentList: docs, keyword, loginName: req.session.loginName },
      function(error, content) {
        res.send(content);
      }
    );
  });
};
module.exports.getAddPage = (req, res) => {
  xtpl.renderFile(
    path.join(__dirname, "../views/add.html"),
    { loginName: req.session.loginName },
    function(error, content) {
      res.send(content);
    }
  );
};
module.exports.addUserInfo = (req, res) => {
  dbtool.insertOne("studentInfo", req.body, (err, result) => {
    if (result) {
      res.send("<script>location.href='/studentManager/list'</script>");
    } else {
      res.send("<script>alert('添加错误')</script>");
    }
  });
};
module.exports.geteditData = (req, res) => {
  const studentId = dbtool.ObjectId(req.params.studentId);
  dbtool.findOne("studentInfo", { _id: studentId }, (err, docs) => {
    xtpl.renderFile(
      path.join(__dirname, "../views/edit.html"),
      { studentInfo: docs, loginName: req.session.loginName },
      function(error, content) {
        res.send(content);
      }
    );
  });
};
module.exports.updataSudentInfo = (req, res) => {
  const studentId = dbtool.ObjectId(req.params.studentId);
  console.log(req.body);
  dbtool.upDataOne(
    "studentInfo",
    { _id: studentId },
    req.body,
    (err, result) => {
      if (result) {
        res.send("<script>location.href='/studentManager/list'</script>");
      } else {
        res.send("<script>alert('修改错误')</script>");
      }
    }
  );
};
module.exports.toDeleteOne = (req, res) => {
  const studentId = dbtool.ObjectId(req.params.studentId);
  dbtool.deleteOne("studentInfo", { _id: studentId }, (err, result) => {
    if (result) {
      res.send("<script>location.href='/studentManager/list'</script>");
    } else {
      res.send("<script>alert('删除错误')</script>");
    }
  });
};
module.exports.loginOut = (req, res) => {
  req.session.loginName = null;
  res.send("<script>window.location.href='/account/login'</script>");
};
