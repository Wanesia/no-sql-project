import { client } from "../config/connection.js";

// Get the database and collections
const myDB = client.db("noSQLProject");
const userColl = myDB.collection("user");
const journeyColl = myDB.collection("journey");

/**
 * Function to create indexes for the collections
 * This function connects to the MongoDB server, creates various indexes for the user and journey collections,
 * and then closes the connection.
 */
export async function createIndexes() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Create an index on the user_id field in the journey collection
    // This index helps to query all travel records for a specific user based on their user_id
    await journeyColl.createIndex({ user_id: 1 });

    // Create an index on the name field in the user collection
    // This index helps to query user records based on their name
    await userColl.createIndex({ name: 1 });

    // Create a unique index on the email field in the user collection
    // This index helps to query user records based on their email address and ensures that the email address is unique
    await userColl.createIndex({ email: 1 }, { unique: true });

    // Create an index on the date_of_creation field in the journey collection
    // This index helps to query and sort travel records based on the date_of_creation field
    await journeyColl.createIndex({ date_of_creation: 1 });

    // Create an index on the image field in the journey collection
    // This index helps to query travel records based on the image field
    await journeyColl.createIndex({ image: 1 });

    // Create an index on the location.city field in the journey collection
    // This index helps to query travel records based on the location.city field
    await journeyColl.createIndex({ "location.city": 1 });

    // Create an index on the location.country field in the journey collection
    // This index helps to query travel records based on the location.country field
    await journeyColl.createIndex({ "location.country": 1 });

    console.log("Indexes created successfully.");
  } catch (error) {
    console.log("Error creating indexes: ", error);
  } finally {
    await client.close(); // Close the connection
  }
}
