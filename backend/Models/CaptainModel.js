const mongoose = require('mongoose');

const CaptainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Please enter a name that must be at least 3 characters long."]
        },
        lastname: {
            type: String,
            minlength: [3, "Please enter a name that must be at least 3 characters long."]
        },
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    socketId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Please enter a color name that must be at least 3 characters long."]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Please enter a plate number that must be at least 3 characters long."]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Please enter a capacity that must be at least 1."]
        },
        vehicalType:{
            type: String,
            enum: ["car", "bike", "auto"],
            required: true
        }
    },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: [null, null]
        }
    }
}, { timestamps: true });

// Add the 2dsphere index for geospatial queries
CaptainSchema.index({ location: '2dsphere' });

const CaptainModel = mongoose.model("captain", CaptainSchema);

module.exports = CaptainModel;
