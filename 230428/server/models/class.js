const mongoose = require('mongoose');


const schema = new mongoose.Schema({
        label: {
            type: String,
            required: true
        },
        poster: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'normal'
        },
    },
    {
        timestamps: true
    }
)


const Classes = mongoose.model('classes', schema)


module.exports = Classes
