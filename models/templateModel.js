const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    tags:[{
        type: String
    }],
    img:{
        data: Buffer,
        contentType: String
      }
});
const template = new mongoose.model("template",templateSchema);


module.exports = template;