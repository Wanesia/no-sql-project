import express from "express";
import {
  createUser,
  deleteUserById,
  updateUserById,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

// Middleware to parse JSON request bodies
router.use(express.json());

/**
 * Route to get all users
 * GET /user
 * Calls the getUser function from the controller
 */
router.get("/", async (req, res) => {
  await getUser();
  res.send("Getting all users");
});

/**
 * Route to insert a new user
 * POST /user
 * Calls the createUser function from the controller
 */
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const result = await createUser(data);
    res.status(201).send(`A document was inserted with the _id: ${result}`);
  } catch (error) {
    res.status(500).send("Error inserting document: " + error.message);
  }
});

/**
 * Route to delete a user by ID
 * DELETE /user/:id
 * Calls the deleteUserById function from the controller
 */
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await deleteUserById(userId);
    if (result.deletedCount === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(`User with ID ${userId} was deleted`);
  } catch (error) {
    res.status(500).send("Error deleting user: " + error.message);
  }
});

/**
 * Route to update a user by ID
 * PUT /user/:id
 * Calls the updateUserById function from the controller
 */
router
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  try {
    const result = await updateUserById(userId, data);
    res.status(200).send(`User with ID ${userId} was updated`);
  } catch (error) {
    res.status(500).send("Error updating user: " + error.message);
  }
});

export default router;
