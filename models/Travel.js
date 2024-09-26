const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    location:{type: String},
    image:{type: String},
    date_from:{type: Date},
    date_to:{type: Date},
    date_of_creation:{type: Date, default: Date.now},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;