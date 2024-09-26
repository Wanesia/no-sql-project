import { client } from "../config/connection.js";
// import user dummy data
import { users } from "../data/users.js";
// import journey dummy data
import { journeys } from "../data/journeys.js";


// Get the database and collections
const myDB = client.db("noSQLProject");
const userColl = myDB.collection("user");
const journeyColl = myDB.collection("journey");


/**
 * Function to add dummy data to the database
 * This function connects to the MongoDB server, inserts dummy user and journey data,
 * logs the inserted document IDs, and then closes the connection.
 */
export async function addData() {
      // Connect to the MongoDB server
  await client.connect();

      // Insert dummy user data
  const resultUser = await userColl.insertMany(users);

      // Insert dummy journey data
  const resultJourney = await journeyColl.insertMany(journeys);
  console.log(
    `documents was inserted with the _ids: ${resultUser.insertedIds} and ${resultJourney.insertedIds}`
  );
  
      // Close the connection to the MongoDB server
  await client.close();
}
