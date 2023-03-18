const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    ratersID: {
        type: String,
    },
    userID: {
        type: String,
        required: true
    },
    rating:{
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Rating', RatingSchema);