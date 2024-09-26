import express from "express";
import { addData } from "./dataOperations.js";
import { createIndexes } from "./utils/indexUtils.js";
import {
  findJourneyByDate,
  findJourneyByUser,
  sortJourneys,
  imageExists,
  findJourneyByCity,
  findJourneyByCountry,
} from "./utils/journeyQueries.js";
import { findUserByEmail, findUserByName } from "./utils/userQueries.js";
import userRoutes from "./routes/userRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";

const app = express();
const port = 3004;

// Middleware to parse JSON request bodies
app.use(express.json());
import { run } from "./config/connection.js";

// Use the user routes
app.use("/user", userRoutes);

// Use the journey routes
app.use("/journey", journeyRoutes);

// Start the server and connect to the database
app.listen(port, async () => {
  try {
    // Connect to MongoDB
    await run();

    //-------------- Uncomment the following lines to perform specific operations

    // await addData();
    // await createIndexes()
    // await findUserByEmail();
    // await findUserByName();
    // await findJourneyByUser();
    // await findJourneyByDate();
    // await sortJourneys();
    // await createUser();
    // await imageExists();
    // await findJourneyByCity();
    // await findJourneyByCountry()
    console.log(`Example app listening on port ${port}`);
  } catch (e) {
    console.log(e);
  }
});
