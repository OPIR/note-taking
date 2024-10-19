import mongoose from "mongoose";

const DB_NAME = "bright-carbon";

const uri = "mongodb://localhost:27017";

/**
 * Initialising db connection. In case there is problem connecting to the mongoDb it will log error in the console.
 *
 * @returns Promise<void>
 */
export async function initDBConnection(): Promise<void> {
  await mongoose
    .connect(`${uri}/${DB_NAME}`)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Not connected to MongoDB:", err);
    });
}
