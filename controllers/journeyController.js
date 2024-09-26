import { client } from "../config/connection.js";
import { ObjectId } from "mongodb";

// Get the database and collection
const myDB = client.db("noSQLProject");
const journeyColl = myDB.collection("journey");

// ------------------ CREATE ------------------ //
// Function to create a new user
export async function createJourney(journey) {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Insert the journey document into the collection
    const result = await journeyColl.insertOne(journey);
    console.log(
      `New journey created with the following id: ${result.insertedId}`
    );
    // Return the ID of the newly created journey
    return result.insertedId;
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await client.close(); // Close the connection
  }
}

// ------------------ DELETE ------------------ //

//Delete a document on the url /journey/id
export async function deleteJourneyById(id) {
  try {
    const objectId = new ObjectId(id); // Convert id to ObjectId
    // Connect to the MongoDB server
    await client.connect();

    // Delete the journey document from the collection
    const result = await journeyColl.deleteOne({ _id: objectId }); // Use _id field for deletion
    console.log(`Attempted to delete document with id: ${id}`);

    // Return the result of the deletion operation
    return result;
  } catch (error) {
    console.error(`Failed to delete document with id: ${id}`, error);
  } finally {
    await client.close(); // Close the connection
  } 
}

// ------------------ UPDATE ------------------ //
// Function to update a journey document by ID
export async function updateJourneyById(id, updatedDocument) {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Convert the string ID to an ObjectId
    const objectId = new ObjectId(id);

    // Update the journey document in the collection
    const result = await journeyColl.updateOne(
      { _id: objectId },
      { $set: updatedDocument }
    );

    console.log(
      `${result.matchedCount} document(s) matched the query criteria.`
    );
    console.log(`${result.modifiedCount} document(s) was/were updated.`);

    // Return the result of the update operation
    return result;
  } catch (error) {
    console.error(`Failed to update document with id: ${id}`, error);
  } finally {
    await client.close(); // Close the connection
  }
}

// ------------------ READ ------------------ //
// Function to get all journey
export async function getJourney() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    // Find all documents in the journey collection
    const result = await journeyColl.find().toArray();
    console.log(result);
    // Return the result
    return result;
  } catch (error) {
    console.error("Error reading journey:", error);
  } finally {
    await client.close(); // Close the connection
  }
}
