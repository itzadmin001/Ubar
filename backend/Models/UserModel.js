const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Enter your name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, "Enter your name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "Enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Enter a password with at least 6 characters"]
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    socketId: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;