const mongoose = require('mongoose');


const BlackListSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours 
    }
})

const BlackListModel = mongoose.model('BlackList', BlackListSchema);

module.exports = BlackListModel;