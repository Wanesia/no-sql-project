const mongoose = require('mongoose');
const User = require('./models/user');
const Travel = require('./models/travel');

// connection to db
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/travelDBtest');
        console.log('MongoDB Connected');
    } catch (err) {
        console.log('MongoDB Connection Error:', err);
    }
};

// find all travels by userId
const findTravelsByUser = async (userId) => {
    try {
        const travels = await Travel.find({ user: userId });
        // return an empty array if no travels are found
        return travels.length > 0 ? travels : [];
    } catch (error) {
        console.error('Error fetching travels:', error);
        return [];
    }
};
//sort all users by alphabetical order

//find user by name and sort their travels by title 

//count number of all travels for userId





//find the oldest created travel

//find travels from 2024

//sort all travels starting from the oldest

//find travel with description(min and max characters)



//update user email by userId

//update travel title by travelId

//delete user by name
//delete travel by title

//insert user
//insert travel

const runQueries = async () => {
    await connectDB();
    const userId = '66f535bacda9c1e11aa6f5c9'; //replace with a valid userId from your db
    const travels = await findTravelsByUser(userId);

    console.log(`Travels for userId: ${userId}:`, travels);
};

runQueries();
