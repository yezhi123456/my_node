const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "myfirstDatabase";
function MongoClientMethod(clientBack) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      clientBack(db);
      client.close();
    }
  );
}
module.exports.insertOne = (collectionName, opt, callBack) => {
  MongoClientMethod(db => {
    const collection = db.collection(collectionName);
    collection.insertOne(opt, function(err, result) {
      callBack(err, result);
    });
  });
};
module.exports.findOne = (collectionName, opt, callBack) => {
  MongoClientMethod(db => {
    const collection = db.collection(collectionName);
    collection.findOne(opt, function(err, docs) {
      callBack(err, docs);
    });
  });
};
module.exports.findAll = (collectionName, opt, callBack) => {
  MongoClientMethod(db => {
    const collection = db.collection(collectionName);
    collection.find(opt).toArray(function(err, docs) {
      callBack(err, docs);
    });
  });
};
