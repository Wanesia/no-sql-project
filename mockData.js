const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); //library for generating fake data
const User = require('./models/user');
const Travel = require('./models/travel');

//connection to db
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/travelDBtest');
        console.log("MongoDB Connected");
        
        //calls generateMockData after successful connection
        await generateMockData();
    } catch (err) {
        console.log("MongoDB Connection Error:", err);
    }
};

//generate fake users
const createMockUsers = async (numOfUsers) => {
    let users = [];
    for (let i = 0; i < numOfUsers; i++) {
        let newUser = new User({
            nickname: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
        users.push(newUser);
    }
    await User.insertMany(users);
    console.log(`${numOfUsers} users created.`);
    return users;
};
//generate fake travels
const createMockTravels = async (users, numTravels) => {
    console.log('func starts');
    let travels = [];
    for (let i = 0; i < numTravels; i++) {
        let randomUser = users[Math.floor(Math.random() * users.length)];  // picks random user to assign it in travels
        let newTravel = new Travel({
            title: faker.lorem.words(10),
            description: faker.lorem.sentences(5),
            location: faker.location.city(),
            image: faker.lorem.words(1), //that would be path to the image file
            date_from: faker.date.past(),
            date_to: faker.date.future(),
            user: randomUser._id,  // Reference to the picked user
        });
        travels.push(newTravel);
    }
    await Travel.insertMany(travels);
    console.log(`${numTravels} travels created.`);
};

const generateMockData = async () => {
    try {
        //clears existing data
        await User.deleteMany({});
        await Travel.deleteMany({});

        //creates users and travels
        const users = await createMockUsers(100);
        await createMockTravels(users, 1000);

        console.log('fake data inserted successfully');
        mongoose.connection.close();
    } catch (err) {
        console.log(err);
        mongoose.connection.close();
    }
};

connectDB();
//mongoose.connection.dropDatabase();
