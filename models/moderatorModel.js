const mongoose = require('mongoose');

const ModeratorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    invitedBy:{
        type: String
    },
    invitationCount:{
        type: Number
    }
});
module.exports = mongoose.model('Moderators', ModeratorSchema);