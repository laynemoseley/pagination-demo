const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "animals";

// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  console.log("Connected successfully to mongodb");
  const db = client.db(dbName);
  const collection = db.collection("kittens");
  collection.drop(() => {
    console.log("The kittens are no more :(");
    client.close();
  });
});
