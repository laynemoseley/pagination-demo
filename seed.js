const MongoClient = require("mongodb").MongoClient;
const {
  uniqueNamesGenerator,
  names,
  starWars,
} = require("unique-names-generator");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "animals";

// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  console.log("Connected successfully to mongodb");

  const db = client.db(dbName);
  checkForKittens(db, (hasKittens, kittenCount) => {
    if (hasKittens) {
      console.log(`mongodb already has ${kittenCount} kittens`);
      client.close();
      return;
    }

    insertKittens(db, () => {
      client.close();
    });
  });
});

checkForKittens = (db, callback) => {
  const collection = db.collection("kittens");
  collection.find({}).toArray(function (err, kittens) {
    const hasKittens = kittens.length > 0;
    callback(hasKittens, kittens.length);
  });
};

const insertKittens = (db, callback) => {
  const collection = db.collection("kittens");
  const kittenCount = 100000;
  const kittens = Array(kittenCount)
    .fill(0)
    .map(() => {
      const width = randomInteger(100, 1000);
      const height = randomInteger(100, 1000);
      const image = `https://placekitten.com/${width}/${height}`;
      const name = randomName();

      return {
        image,
        name,
      };
    });

  collection.insertMany(kittens, function (err, result) {
    console.log(`inserted ${result.insertedCount} kittens into the database`);
    callback(result);
  });
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomName() {
  return uniqueNamesGenerator({
    separator: " ",
    dictionaries: [names, starWars],
  });
}
