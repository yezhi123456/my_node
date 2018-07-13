const path = require("path");
const xtpl = require("xtpl");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "myfirstDatabase";
module.exports.getList = (req, res) => {
  let keyword = req.query.keyword || "";
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      const collection = db.collection("studentInfo");
      // Find some documents
      collection
        .find({ name: { $regex: keyword } })
        .toArray(function(err, docs) {
          xtpl.renderFile(
            path.join(__dirname, "../views/list.html"),
            { studentList: docs },
            function(error, content) {
              res.send(content);
              client.close();
            }
          );
        });
    }
  );
};
