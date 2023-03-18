const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    userEmail:{
        type: String
    },
    comment:{
        type: String
    },
    like:{
        type: Number
    },
    dislike:{
        type: Number
    },
    reports:{
        type: Number
    },
    postID:{
        type: String
    },
    postAuthor:{
        type: String
    },
    date:{
        type: Date
    }
});
module.exports = mongoose.model('PostsComment', CommentSchema);