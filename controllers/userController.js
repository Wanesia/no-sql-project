import { client } from "../config/connection.js";
import { ObjectId } from "mongodb";

// Get the database and collection
const myDB = client.db("noSQLProject");
const userColl = myDB.collection("user");

// ------------------ CREATE ------------------ //
// Function to create a new user
export async function createUser(user) {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Insert the user document into the collection
    const result = await userColl.insertOne(user);
    console.log(`New user created with the following id: ${result.insertedId}`);

    // Return the ID of the newly created user
    return result.insertedId;
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await client.close(); // Close the connection
  }
}

// ------------------ DELETE ------------------ //

//Delete a document on the url /user/id
export async function deleteUserById(id) {
  try {
    // Convert the string ID to an ObjectId
    const objectId = new ObjectId(id);

    // Connect to the MongoDB server
    await client.connect();

    // Delete the user document from the collection
    const result = await userColl.deleteOne({ _id: objectId }); // Use _id field for deletion
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
// Function to update a user document by ID
export async function updateUserById(id, updatedDocument) {
  try {
  // Connect to the MongoDB server
  await client.connect();

  // Convert the string ID to an ObjectId
  const objectId = new ObjectId(id); // Convert id to ObjectId

  // Update the user document in the collection
  const result = await userColl.updateOne(
    { _id: objectId },
    { $set: updatedDocument }
  );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
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
// Function to get all users
export async function getUser() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Retrieve all user documents from the collection
    const result = await userColl.find().toArray();
    console.log(result);

    // Return the array of user documents
    return result;
  } catch (error) {
    console.error("Error getting users:", error);
  } finally {
    await client.close(); // Close the connection
  }
}
