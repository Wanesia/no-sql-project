import { client } from "../config/connection.js";

// Get the database and collection
const myDB = client.db("noSQLProject");
const userColl = myDB.collection("user");

/**
 * Query to find a user by name
 * This function connects to the MongoDB server, queries the user collection for users
 * with the name "John Doe", logs the results, and then closes the connection.
 */
export async function findUserByName() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    // Query the user collection for users with the name "John Doe"
    const result = await userColl.find({ name: "John Doe" }).toArray();
    console.log(`Query result: ${JSON.stringify(result)}`);
    console.log(result);
  } catch (error) {
    console.error("Failed to find user by name", error);
  } finally {
    await client.close(); // Close the connection
  }
}

/**
 * Query to find a user by email
 * This function connects to the MongoDB server, queries the user collection for users
 * with an existing email and either the name "John Doe" or "Jane Smith", logs the results,
 * and then closes the connection.
 */
export async function findUserByEmail() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    // Query the user collection for users with an existing email and either the name "John Doe" or "Jane Smith"
    const result = await userColl
      .find({
        $and: [
          { email: { $exists: true } },
          { $or: [{ name: "John Doe" }, { name: "Jane Smith" }] },
        ],
      })
      .toArray();
    console.log(`Query result: ${JSON.stringify(result)}`);
    console.log(result);
  } catch (error) {
    console.error("Failed to find user by email", error);
  } finally {
    await client.close(); // Close the connection
  }
}
