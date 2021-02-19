const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "animals";

const getCollection = (callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {      
        if (err) {
            callback(err);
            return;
        }
        const db = client.db(dbName);
        const collection = db.collection("kittens");
        callback(null, collection);
      });
}

const getAllKittens = (callback) => {
    getCollection((err, collection) => {
        if (err) {
            callback(err);
            return;
        }

        collection.find({}).toArray(function (err, kittens) {
            callback(err, kittens);
          });
    })
}

const getKittens = (limit, skip, callback) => {
    getCollection((err, collection) => {
        if (err) {
            callback(err);
            return;
        }

        collection.find({}).limit(limit).skip(skip).toArray(function (err, kittens) {
            callback(err, kittens);
          });
    })
}

module.exports = { getAllKittens, getKittens };