const mongoose = require('mongoose');

const TemplateSchema = mongoose.Schema({
    templateId: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    html:{
        type: String,
        required: false
    }
});


module.exports = mongoose.model('TemplateStore', TemplateSchema);