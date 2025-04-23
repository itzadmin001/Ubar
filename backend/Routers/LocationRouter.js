const express = require('express');
const LocationRouter = express.Router()
const locationController = require('../Controllars/LocationControlar');



LocationRouter.get("/user", (req, res) => {
    const { location } = req.query;
    console.log(location)
    const result = new locationController().getcondinate(location)
        .then(
            (success) => {
                console.log(success)
                res.send(success)
            }
        ).catch((err) => {
            console.log(err)
            res.send(err)
        })
})

LocationRouter.post("/get-distance", (req, res) => {
    const { pickUpLocation, destinationLocation } = req.body
    const result = new locationController().calculateFare(pickUpLocation, destinationLocation)
        .then(
            (success) => {
                console.log(success)
                res.send(success)
            }
        ).catch((err) => {
            console.log(err)
            res.send(err)
        })
})

LocationRouter.post("/get-suggestions", (req, res) => {
    const { location } = req.body.params;
    const result = new locationController().getSuggestions(location)
        .then(
            (success) => {
                console.log(success)
                res.send(success)
            }
        ).catch((err) => {
            console.log(err)
            res.send(err)
        })

})


module.exports = LocationRouter;