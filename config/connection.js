import { MongoClient, ServerApiVersion } from "mongodb";

//mongo db connection URI
const uri = "mongodb://localhost:27017";


// create a new MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Function to connect to the MongoDB server
 * This function establishes a connection to the MongoDB server
 * and closes the connection immediately after.
 */
export async function run() {
  try {
    await client.connect();
  } finally {
    await client.close();
  }
}
// Export the run function
export default run;

// Export the client instance for use in other modules
export { client };
