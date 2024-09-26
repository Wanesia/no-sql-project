const mongoose = require("mongoose");
const User = require("./models/user");
const Travel = require("./models/travel");
const readline = require("readline");


// connection to db
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/travelDBtest");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
};
//find user by nickname
const findUserByNickname = async (nickname) => {
  try {
    const user = await User.findOne({ nickname });
    if (!user) {
      console.error("User not found");
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by nickname:", error);
    return null;
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
const sortUsersTravel = async (name) => {
    try {
      const user = await User.findOne({ nickname: name });
      if (!user) {
          console.error("User not found");
          return [];
        }
      const travels = await Travel.find({user: user._id}).sort({title: 1});
      return travels
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

//find the newest created travel
const findNewestTravel = async () => {
  try {
    const newestTravel = await Travel.findOne().sort({ date_of_creation: -1 });
    return newestTravel;
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

//find travel with description(min and max characters)
const findTravelWithDescription = async (min, max) => {
  try {
    const travels = await Travel.find();
    const filteredTravels = travels.filter(travel => {
      const descLength = travel.description.length;
      return descLength >= min && descLength <= max;
    });

    return filteredTravels;
  } catch (error) {
    console.error('Error fetching travels with min max description characters:', error);
    return [];
  }
};

//update user email by userId
const updateUserEmailById = async (userId, newEmail) => {
  try {
      await User.updateOne({ _id: userId }, { email: newEmail });
      console.log(`User email updated to ${newEmail} for user ID: ${userId}`);
  } catch (error) {
      console.error('Error updating user email:', error);
  }
};


//delete user by name
const deleteUserByName = async (name) => {
  try {
      const result = await User.deleteOne({ nickname: name });
  } catch (error) {
      console.error('Error deleting user:', error);
  }
};

//delete travel by title
const deleteTravelByTitle = async (title) => {
  try {
      const result = await Travel.deleteOne({ title: title });
  } catch (error) {
      console.error('Error deleting travel:', error);
  }
};


//insert user
const insertUser = async (nickname, email, password) => {
  try {
      const newUser = new User({
          nickname,
          email,
          password,
      });

      await newUser.save(); // Save the new user to the database
      console.log('User inserted successfully:', newUser);
  } catch (error) {
      console.error('Error inserting user:', error);
  }
};

//insert travel
const insertTravel = async (title, description, location, image, dateFrom, dateTo, userId) => {
  try {
      // Check if the user exists
      const userExists = await User.findById(userId);
      if (!userExists) {
          console.error('User does not exist');
          return;
      }
      const newTravel = new Travel({
          title,
          description,
          location,
          image,
          date_from: dateFrom,
          date_to: dateTo,
          user: userId, // Correctly reference the ObjectId or it will throw error
      });

      await newTravel.save();
      console.log('Travel inserted successfully:', newTravel);
  } catch (error) {
      console.error('Error inserting travel:', error);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// run queries function with switch cases based on user input
// function to handle query selection
const querySelection = async () => {
  rl.question(
    `Enter a number to select an operation:
    1: Read
    2: Create
    3: Update
    4: Delete
    0: Exit
    Enter your choice: `,
    async (operationChoice) => {
      if (operationChoice === '0') {
        console.log('Exited');
        rl.close();
        return;
      }

      switch (parseInt(operationChoice)) {
        //read operations
        case 1:
          rl.question(
            `Select a query: 
            1: Find travels by user ID
            2: Sort users by name
            3: Find user by name and sort their travels by title
            4: Count number of travels for a user
            5: Find the newest created travel
            6: Find travels from 2023
            7: Find travel with min-max description characters
            8: Find user by name
            0: Go back to main menu
            Enter your choice: `,
            async (queryChoice) => {
              switch (parseInt(queryChoice)) {
                case 1:
                  rl.question('Enter user ID: ', async (userId) => {
                    const travels = await findTravelsByUser(userId);
                    console.log(`Travels for userId ${userId}:`, travels);
                    querySelection();
                  });
                  break;
                case 2:
                  const users = await sortUsersByName();
                  console.log('Sorted users by name:', users);
                  querySelection();
                  break;
                case 3:
                  rl.question('Enter user nickname: ', async (nickname) => {
                    const sortedTravels = await sortUsersTravel(nickname);
                    console.log(`Travels for user ${nickname}:`, sortedTravels);
                    querySelection();
                  });
                  break;
                case 4:
                  rl.question('Enter user ID: ', async (userId) => {
                    const travelCount = await countTravelsForUser(userId);
                    console.log(`Travel count for userId: ${userId} = ${travelCount}`);
                    querySelection();
                  });
                  break;
                case 5:
                  const newestTravel = await findNewestTravel();
                  console.log('Newest travel:', newestTravel);
                  querySelection();
                  break;
                case 6:
                  const travels2023 = await findTravelsFrom2023();
                  console.log('Travels from 2023:', travels2023);
                  querySelection();
                  break;
                case 7:
                  rl.question('Min characters: ', async (min) => {
                    rl.question('Max characters: ', async (max) => {
                      const travels = await findTravelWithDescription(min, max);
                      console.log('Travels found:', travels);
                      querySelection();
                    });
                  });
                  break;
                case 8:
                  rl.question('Enter user nickname: ', async (nickname) => {
                    const user = await findUserByNickname(nickname);
                    if (user) {
                      console.log('User found:', user);
                    }
                    querySelection();
                  });
                case 0:
                  querySelection();
                  break;
                default:
                  console.log('Please enter a valid number.');
                  querySelection();
              }
            }
          );
          break;
        //create operations
        case 2:
          rl.question(
            `Select a query:
            1: Insert User
            2: Insert Travel
            0: Go back to main menu
            Enter your choice: `,
            async (createChoice) => {
              switch (parseInt(createChoice)) {
                case 1:
                  rl.question('Enter nickname: ', (nickname) => {
                    rl.question('Enter email: ', (email) => {
                      rl.question('Enter password: ', async (password) => {
                        await insertUser(nickname, email, password);
                        querySelection();
                      });
                    });
                  });
                  break;
                case 2:
                  rl.question('Enter title: ', (title) => {
                    rl.question('Enter description: ', (description) => {
                      rl.question('Enter location: ', (location) => {
                        rl.question('Enter image URL: ', (image) => {
                          rl.question('Enter date from (YYYY-MM-DD): ', (dateFrom) => {
                            rl.question('Enter date to (YYYY-MM-DD): ', async (dateTo) => {
                              rl.question('Enter user ID: ', async (userId) => {
                                await insertTravel(title, description, location, image, dateFrom, dateTo, userId);
                                querySelection();
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                  break;
                case 0:
                  querySelection();
                  break;
                default:
                  console.log('Please enter a valid number.');
                  querySelection();
              }
            }
          );
          break;
        //update operations
        case 3:
          rl.question(
            `Select a query:
            1: Update User Email
            0: Go back to main menu
            Enter your choice: `,
            async (updateChoice) => {
              switch (parseInt(updateChoice)) {
                case 1:
                  rl.question('Enter user ID: ', (userId) => {
                    rl.question('Enter new email: ', async (newEmail) => {
                      await updateUserEmailById(userId, newEmail);
                      querySelection();
                    });
                  });
                  break;
                case 0:
                  querySelection();
                  break;
                default:
                  console.log('Please enter a valid number.');
                  querySelection();
              }
            }
          );
          break;
        //delete operations
        case 4:
          rl.question(
            `Select a query:
            1: Delete User by Name
            2: Delete Travel by Title
            0: Go back to main menu
            Enter your choice: `,
            async (deleteChoice) => {
              switch (parseInt(deleteChoice)) {
                case 1:
                  rl.question('Enter user nickname: ', async (nickname) => {
                    await deleteUserByName(nickname);
                    console.log(`User with nickname ${nickname} deleted.`);
                    querySelection();
                  });
                  break;
                case 2:
                  rl.question('Enter travel title: ', async (title) => {
                    await deleteTravelByTitle(title);
                    console.log(`Travel with title ${title} deleted.`);
                    querySelection();
                  });
                  break;
                case 0:
                  querySelection();
                  break;
                default:
                  console.log('Please enter a valid number.');
                  querySelection();
              }
            }
          );
          break;

        default:
          console.log('Please enter a valid number.');
          querySelection();
      }
    }
  );
};

const runQueries = async () => {
  await connectDB();
  querySelection();
};

runQueries();
