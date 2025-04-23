const { getDistanceTime, getCaptainsInTheRadius, calculateFare, getcondinate, getGeoCoordinates } = require("../utilitis/Fare");
const RideModel = require("../Models/RideModel");
const { generateOTP } = require("../utilitis/UserAuth");
const { sendMessageToSocketId } = require("../Socket");
const { response } = require("express");

class RideController {
    create(userId, data) {
        return new Promise(
            async (res, rej) => {
                if (!userId && data.pickup === "" && data.destination == "" && data.vehicletype == "") {
                    rej({ status: 0, msg: "plase enter all filds" })
                } else {
                    try {
                        const result = await calculateFare(data.pickup, data.destination, data.vehicletype)

                        if (!result) {
                            rej({ status: 0, msg: "Unable to calculate fare" })
                        } else {
                            console.log(result)
                            const Otp = generateOTP()
                            const CreateRide = await RideModel.create({
                                user: userId,
                                pickup: data.pickup,
                                destination: data.destination,
                                vehicletype: data.vehicletype,
                                fare: result.price,
                                otp: Otp
                            })
                            CreateRide.save()
                            res({ status: 1, msg: "Ride created successfully", data: CreateRide })

                            // Getting pickup coordinates
                            const pickUpCodinates = await getGeoCoordinates(data.pickup);
                            console.log(pickUpCodinates, "Pickup Coordinates");

                            // Getting captains in the radius
                            const captainInRadius = await getCaptainsInTheRadius(pickUpCodinates.ltd, pickUpCodinates.lng, 300); // Radius in km
                            console.log(captainInRadius, "Captains in the radius");

                            result.otp = ""

                            const rideWithinUser = await RideModel.find({ _id: CreateRide._id }).populate("user")
                            console.log(rideWithinUser)

                            if (rideWithinUser.length > 0) {
                                const rideConfirm = rideWithinUser[0]
                                captainInRadius.map(captain => {
                                    sendMessageToSocketId(captain.socketId, {
                                        event: "new-ride",
                                        data: rideConfirm
                                    })
                                });
                            } else {
                                console.log("No ride found.")
                            }

                        }

                    } catch (err) {
                        console.log(err);
                        rej({ status: 0, msg: "internal server error" })
                    }
                }
            })
    }
    confirm(rideId, captainId) {
        return new Promise(
            async (res, rej) => {
                if (!rideId) {
                    rej({ status: 0, msg: "Please provide ride id" })
                    return;
                } else {
                    try {
                        const UpdateRide = await RideModel.findOneAndUpdate(
                            { _id: rideId },
                            { status: 'accepted', captain: captainId },
                            { new: true }
                        );

                        if (!UpdateRide) {
                            rej({ status: 0, msg: "Failed to update ride" });
                            return;
                        }

                        const Ride = await RideModel.findOne({ _id: rideId })
                            .populate("user")
                            .populate("captain").select('+otp');

                        if (!Ride) {
                            rej({ status: 0, msg: "No ride found" });
                        } else {
                            console.log(Ride, "ride hai re");
                            res({
                                status: 1,
                                msg: "Ride confirmed successfully",
                                data: Ride,
                            });
                        }
                    } catch (err) {
                        console.log(err);
                        rej({ status: 0, msg: "internal server error" });
                    }
                }
            })
    }

    confirmOtp(rideId, otp) {
        return new Promise(
            async (res, rej) => {
                if (!rideId || !otp) {
                    rej({ status: 0, msg: "Please provide ride id and otp" })
                } else {
                    try {
                        const FindRide = await RideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp')
                        if (FindRide) {
                            if (FindRide.otp == otp) {
                                const UpdateRide = await RideModel.findOneAndUpdate(
                                    { _id: rideId },
                                    { status: 'ongoing' },
                                    { new: true })
                                res({
                                    status: 1,
                                    msg: "Ride confirmed otp successfully",
                                    data: FindRide,
                                })
                            } else {
                                rej({ status: 0, msg: "Invalid OTP" })
                                return;

                            }
                        } else {
                            rej({ status: 0, msg: "Ride not found" })
                            return;
                        }
                    } catch (err) {
                        console.log(err);
                        rej({ status: 0, msg: "internal server error" });
                    }
                }
            }
        )

    }
    finish(rideId, captainId) {
        return new Promise(
            async (res, rej) => {
                if (!rideId) {
                    rej({ status: 0, msg: "Please provide ride id" })
                } else {
                    try {
                        const FindRide = await RideModel.findOne({ _id: rideId, captain: captainId }).populate('user').populate('captain')
                        if (!FindRide) {
                            rej({ status: 0, msg: "Ride not found" })
                        } else {
                            const updateRide = await RideModel.findOneAndUpdate({ _id: rideId }, { status: 'completed' }, { new: true })
                            res({ status: 1, msg: "Ride finished successfully", data: FindRide })
                        }
                    } catch (err) {
                        rej({ status: 0, msg: "internal server error " })
                    }
                }
            })
    }
}

module.exports = RideController;
