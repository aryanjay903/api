// Select the database to use.
use("api");

// Insert a few documents into the sales collection.
db.getCollection("technologies").insertMany([{ language: "go" }]);
// db.getCollection("technologies").find();
