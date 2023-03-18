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
    },
    verified:{
        type: Boolean
    }
});
const users = new mongoose.model("users",UserSchema);


module.exports = users;