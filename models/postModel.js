const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    userEmail:{
        type: String
    },
    title:{
        type: String
    },
    tags:[{
        type: String
    }],
    content:{
        type: String
    },
    like:{
        type: Number
    },
    dislike:{
        type: Number
    },
    moderatedBy:{
        type: String
    },
    lastUpdated:{
        type: Date
    }
});
module.exports = mongoose.model('Posts', PostSchema);