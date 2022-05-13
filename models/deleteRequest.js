const mongoose = require('mongoose');

const deleteReqSchema = mongoose.Schema({
    postID: {
        type: String
    },
    deleteReqCount:{
        type: Number 
    },
    modsMails:{
        type: Array
    }
});
module.exports = mongoose.model('deleteReq', deleteReqSchema);