const path = require("path");
const xtpl = require("xtpl");
const dbtool = require(path.join(__dirname, "../tools/dbtool"));
module.exports.getList = (req, res) => {
  let keyword = req.query.keyword || "";
  dbtool.findAll("studentInfo", { name: { $regex: keyword } }, (err, docs) => {
    xtpl.renderFile(
      path.join(__dirname, "../views/list.html"),
      { studentList: docs, keyword },
      function(error, content) {
        res.send(content);
      }
    );
  });
};
