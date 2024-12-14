const mongoose = require('mongoose')



const RideShema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'captain',
        },
        pickup: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        fare: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'ongoing', 'rejected', 'completed'],
            default: 'pending'
        },
        duration: {
            type: Number // in seconds
        },
        distance: {
            type: Number // in miter
        },
        paymentId: {
            type: String
        },
        orderId: {
            type: String
        },
        signature: {
            type: String
        },
        otp: {
            type: String,
            select: false
        }
    }
)


const RideModel = mongoose.model('Ride', RideShema)

module.exports = RideModel