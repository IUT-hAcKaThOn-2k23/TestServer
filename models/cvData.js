const mongoose = require('mongoose');

const CvDataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: false
    },
    location: {
        address: {
            type: String,
            required: false
        },
        postalCode: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        countryCode: {
            type: String,
            required: false
        },
        region: {
            type: String,
            required: false
        }
    },
    relExp: {
        type: String,
        required: false
    },
    totalExp: {
        type: String,
        required: false
    },
    objective: {
        type: String,
        required: false
    },
    skills: {
        // this will be a array of objects
        type: Array,
        required: false
    },
    work: {
        type: Array,
        required: false
    },
    education: {
        type: Array,
        required: false
    },
    volunteer: {
        type: Array,
        required: false
    },
    awards: {
        type: Array,
        required: false
    }

})

module.exports = mongoose.model('CvData', CvDataSchema);