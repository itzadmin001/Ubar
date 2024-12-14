const express = require('express');
const RideRouter = express.Router()
const { body } = require("express-validator");
const RideController = require('../Controllars/RideControllar');
const { sendMessageToSocketId } = require('../Socket');



RideRouter.post("/create-ride", (req, res) => {
    if (req.query.userId === undefined) {
        return res.status(400).json({ message: "userId is required" })
    }
    const result = new RideController().create(req.query.userId, req.body)
        .then((success) => {
            console.log(success)
            res.send(success)

        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
})


RideRouter.post("/confirm-ride", (req, res) => {
    const { rideId, captainId } = req.query;
    const result = new RideController().confirm(rideId, captainId)
        .then((success) => {
            res.send(success)
            sendMessageToSocketId(success.data.user.socketId, {
                event: 'ride-confirmed',
                data: success
            })
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
})


RideRouter.get("/confirm-otp", (req, res) => {
    const { rideId, otp } = req.query;
    const result = new RideController().confirmOtp(rideId, otp)
        .then((success) => {
            res.send(success)
            if (success.data.status === 1) {
                Navigator
            }
            sendMessageToSocketId(success.data.user.socketId, {
                event: 'ride-started',
                data: success
            })
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
})


RideRouter.post("/finish-ride", (req, res) => {
    const { rideId, captainId } = req.query;
    console.log(rideId, captainId)
    const result = new RideController().finish(rideId, captainId)
        .then((success) => {
            res.send(success)
            console.log(success, "finish hai")
            sendMessageToSocketId(success.data.user.socketId, {
                event: 'ride-finished',
                data: success
            })
        }).catch((err) => {
            console.log(err)
            res.send(err)
        })
})





module.exports = RideRouter;