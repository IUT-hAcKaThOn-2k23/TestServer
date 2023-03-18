const mongoose = require('mongoose');

const OTPSchema = mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    date:{
        type: Date 
    },
    otpFor:{
        type: String
    }
});
module.exports = mongoose.model('OTPCache', OTPSchema);