import express from "express";
import {
  createJourney,
  deleteJourneyById,
  getJourney,
  updateJourneyById,
} from "../controllers/journeyController.js";

const router = express.Router();

// Middleware to parse JSON request bodies
router.use(express.json());


/**
 * Route to get all journeys
 * GET /journey
 * Calls the getJourney function from the controller
 */
router.get("/", async (res) => {
  await getJourney();
  res.send("Getting all journeys");
});

/**
 * Route to insert a new journey
 * POST /journey
 * Calls the createJourney function from the controller
 */
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const result = await createJourney(data);
    res.status(201).send(`A document was inserted with the _id: ${result}`);
  } catch (error) {
    res.status(500).send("Error inserting document: " + error.message);
  }
});

/**
 * Route to delete a journey by ID
 * DELETE /journey/:id
 * Calls the deleteJourneyById function from the controller
 */
router.delete("/:id", async (req, res) => {
  const journeyId = req.params.id;
  try {
    const result = await deleteJourneyById(journeyId);
    if (result.deletedCount === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(`User with ID ${userId} was deleted`);
  } catch (error) {
    res.status(500).send("Error deleting user: " + error.message);
  }
});

/**
 * Route to update a journey by ID
 * PUT /journey/:id
 * Calls the updateJourneyById function from the controller
 */
router.put("/:id", async (req, res) => {
  const journeyId = req.params.id;
  const data = req.body;
  try {
    const result = await updateJourneyById(journeyId, data);
    res.status(200).send(`Journey with ID ${journeyId} was updated`);
  } catch (error) {
    res.status(500).send("Error updating user: " + error.message);
  }
});

export default router;
