import { Db, MongoClient } from "mongodb";
import mongoose from "mongoose";

const DB_NAME = "bright-carbon";

const uri = "mongodb://localhost:27017";

export async function initDBConnection(): Promise<void> {
  const client = await MongoClient.connect(uri);
  let db: Db;
  try {
    db = client.db(DB_NAME);
  } catch (err) {
    console.log("Connecting to mongo failed. Reason:", err);
  }

  await mongoose
    .connect(`${uri}/${DB_NAME}`)
    .then((_db) => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Not connected to MongoDB:", err);
    });
}
