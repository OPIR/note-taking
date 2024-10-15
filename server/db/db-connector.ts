import { Db, MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
let db: Db;

try {
  db = client.db("bright-carbon");
} catch (err) {
  console.log("Connecting to mongo failed. Reason:", err);
}

export default db;
