const express = require('express');
const { body, validationResult } = require("express-validator")


const Uservalidation = [
    body("fullname.firstname").notEmpty().isLength({ min: 3 }).withMessage("Enter first name in a must be a 3 character"),
    body("fullname.lastname").notEmpty().isLength({ min: 3 }).withMessage("Enter the last name for must be a 3 character"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.send({
                status: 0,
                msg: error.array()[0].msg
            })
        }
        next()
    }

]

const Captainvalidation = [
    body("fullname.firstname").notEmpty().isLength({ min: 3 }).withMessage("Enter first name in a must be a 3 character"),
    body("fullname.lastname").notEmpty().isLength({ min: 3 }).withMessage("Enter the last name for must be a 3 character"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").notEmpty().isLength({ min: 3 }).withMessage("color must be at least 3 characters long"),
    body("vehicle.plate").notEmpty().isLength({ min: 3 }).withMessage("Plate numbers must be at least 3 characters long"),
    body("vehicle.capacity").notEmpty().isLength({ min: 1 }).withMessage("Capacity must be at least 1 characters long"),
    body("vehicle.vehicalType").notEmpty().withMessage("Vechical type must be at least 3 characters long"),
    (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.send({
                status: 0,
                msg: error.array()[0].msg
            })
        }
        next()
    }
]
module.exports = { Uservalidation, Captainvalidation }