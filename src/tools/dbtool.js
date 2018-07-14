const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
exports.ObjectId = ObjectId;
const url = "mongodb://localhost:27017";
const dbName = "myfirstDatabase";
function MongoClientMethod(collectionName, clientBack) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      clientBack(collection, client);
    }
  );
}
module.exports.insertOne = (collectionName, opt, callBack) => {
  MongoClientMethod(collectionName, (collection, client) => {
    collection.insertOne(opt, function(err, result) {
      client.close();
      callBack(err, result);
    });
  });
};
module.exports.findOne = (collectionName, opt, callBack) => {
  MongoClientMethod(collectionName, (collection, client) => {
    collection.findOne(opt, function(err, docs) {
      client.close();
      callBack(err, docs);
    });
  });
};
module.exports.findAll = (collectionName, opt, callBack) => {
  MongoClientMethod(collectionName, (collection, client) => {
    collection.find(opt).toArray(function(err, docs) {
      client.close();
      callBack(err, docs);
    });
  });
};
module.exports.upDataOne = (collectionName, select, opt, callBack) => {
  MongoClientMethod(collectionName, (collection, client) => {
    collection.updateOne(select, { $set: opt }, function(err, result) {
      client.close();
      callBack(err, result);
    });
  });
};
module.exports.deleteOne = (collectionName, opt, callBack) => {
  MongoClientMethod(collectionName, (collection, client) => {
    collection.deleteOne(opt, function(err, result) {
      callBack(err, result);
    });
  });
};
