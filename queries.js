const mongoose = require("mongoose");
const User = require("./models/user");
const Travel = require("./models/travel");

// connection to db
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/travelDBtest");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
};

// find all travels by userId
const findTravelsByUser = async (userId) => {
  try {
    const travels = await Travel.find({ user: userId });
    // return an empty array if no travels are found
    return travels.length > 0 ? travels : [];
  } catch (error) {
    console.error("Error fetching travels:", error);
    return [];
  }
};

//sort all users by alphabetical order
const sortUsersByName = async () => {
  try {
    const users = await User.find().sort({ nickname: 1 });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

//find user by name and sort their travels by title in alphabetical order
const findUserByName = async (name) => {
    try {
      const user = await User.findOne({ nickname: name });
      if (!user) {
          console.error("User not found");
          return [];
        }
      const travels = await Travel.find({user: user._id}).sort({title: 1});
      return travels
      // return user;
    } catch (error) {
      console.error("Error fetching user by name:", error);
      return null;
    }
  };

//count number of all travels for userId
const countTravelsForUser = async (userId) => {
  try {
    const count = await Travel.countDocuments({ user: userId });
    return count;
  } catch (error) {
    console.error("Error counting travels for user:", error);
    return 0;
  }
};

//find the oldest created travel
const findOldestTravel = async () => {
  try {
    const oldestTravel = await Travel.findOne().sort({ date_of_creation: 1 });
    return oldestTravel;
  } catch (error) {
    console.error("Error fetching oldest travel:", error);
    return null;
  }
};

//find travels from 2023
const findTravelsFrom2023 = async () => {
  try {
    const travels = await Travel.find({
      date_from: {
        $gte: new Date("2023-01-01T00:00:00Z"),
        $lt: new Date("2023-12-31T00:00:00Z"),
      },
    });
    console.log(`Found ${travels.length} travels from 2023:`, travels);
    return travels;
  } catch (error) {
    console.error("Error fetching travels from 2023:", error);
    return [];
  }
};

//sort all travels starting from the oldest
const sortTravelsByDate = async () => {
  try {
    const travels = await Travel.find().sort({ date_of_creation: 1 });
    return travels;
  } catch (error) {
    console.error("Error fetching travels:", error);
    return [];
  }
};

//find travel with description(min and max characters)

//update user email by userId

//update travel title by travelId

//delete user by name
//delete travel by title

//insert user
//insert travel

const runQueries = async () => {
  await connectDB();
//   const userId = "66f54c9e6712b80de5b34b27"; //replace with a valid userId from your db
  //   const travels = await findTravelsByUser(userId);
    // console.log(await findOldestTravel());
  //   console.log(await findTravelsFrom2023());
  // console.log(await sortTravelsByDate());
//   console.log(await countTravelsForUser(userId));
  //   console.log(`Travels for userId: ${userId}:`, travels);
//   const name1 = "Monroe.Gerlach76";
// console.log(await findUserByName(name1));
// console.log(await sortUsersByName());
};

runQueries();
