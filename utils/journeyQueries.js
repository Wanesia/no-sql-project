import { client } from "../config/connection.js";

// Get the database and collection
const myDB = client.db("noSQLProject");
const journeyColl = myDB.collection("journey");

/**
 * Query to find the journeys of a specific user
 * This function connects to the MongoDB server, queries the journey collection for journeys
 * associated with a specific user ID, logs the results, and then closes the connection.
 */
export async function findJourneyByUser() {
  // Connect to the MongoDB server
  await client.connect();
  // Query the journey collection for journeys associated with a specific user ID
  const result = await journeyColl
    .find({
      user_id: "66f309fae72c3f1de5b5da08",
    })
    .toArray();
  console.log(result);
  await client.close(); // Close the connection
}

/**
 * Query to find journeys between two dates
 * This function connects to the MongoDB server, queries the journey collection for journeys
 * created between two specified dates, logs the results, and then closes the connection.
 */
export async function findJourneyByDate() {
  // Define the start and end dates for the query
  const startDate = new Date("2023-04-15T00:00:00Z");
  const endDate = new Date("2023-05-25T00:00:00Z");
  console.log(`Querying for journeys between ${startDate} and ${endDate}`);
  try {
    // Connect to the MongoDB server
    await client.connect();
    // Query the journey collection for journeys created between the specified dates
    const result = await journeyColl
      .find({
        $and: [
          { date_of_creation: { $gte: startDate } },
          { date_of_creation: { $lte: endDate } },
        ],
      })
      .toArray();
    console.log(result);
  } catch (error) {
    console.error("Failed to find journeys by date", error);
  } finally {
    await client.close(); // Close the connection
  }
}

/**
 * Query to sort journeys by date of creation from newest to oldest
 * This function connects to the MongoDB server, queries the journey collection to sort journeys
 * by the date_of_creation field in descending order, logs the results, and then closes the connection.
 */
export async function sortJourneys() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    // Sort the journeys by date_of_creation in descending order
    const result = await journeyColl
      .find()
      .sort({ date_of_creation: -1 })
      .toArray();
    console.log(result);
  } catch (error) {
    console.error("Failed to sort journeys", error);
  } finally {
    await client.close(); // Close the connection
  }
}
/**
 * Query to check if the image field exists in the collection
 * This function connects to the MongoDB server, queries the journey collection to check if the image field exists,
 * logs the results, and then closes the connection.
 */
export async function imageExists() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    // Check if the image field exists in the collection
    const result = await journeyColl
      .find({ image: { $exists: true } })
      .toArray();
    console.log(result);
  } catch (error) {
    console.error("Failed to check if image field exists", error);
  } finally {
    await client.close(); // Close the connection
  }
}

/**
 * Query to find journeys by city
 * This function connects to the MongoDB server, queries the journey collection for journeys
 * in a specific city, logs the results, and then closes the connection.
 */
export async function findJourneyByCity() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    // Query the journey collection for journeys in a specific
    const result = await journeyColl
      .find({ "location.city": "Tokyo" })
      .toArray();
    console.log(result);
  } catch (error) {
    console.error("Failed to find journeys by city", error);
  } finally {
    await client.close(); // Close the connection
  }
}
/**
 * Query to find journeys by country
 * This function connects to the MongoDB server, queries the journey collection for journeys
 * in a specific country, logs the results, and then closes the connection.
 */
export async function findJourneyByCountry() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    // Query the journey collection for journeys in a specific country
    const result = await journeyColl
      .find({ "location.country": "Japan" })
      .toArray();
    console.log(result);
  } catch (error) {
    console.error("Failed to find journeys by country", error);
  } finally {
    await client.close(); // Close the connection
  }
}
