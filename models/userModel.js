const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating:{
        type: Number
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    about:{
        type: String
    }
});
module.exports = mongoose.model('Users', UserSchema);