const express = require('express')
const { Captainvalidation } = require('../middleware/UserValidation')
const CaptainRouter = express.Router()
const CaptainControllar = require("../Controllars/CaptainControllar")




CaptainRouter.post("/register", Captainvalidation,
    (req, res) => {
        const Result = new CaptainControllar().create(req.body)
            .then(
                (success) => {
                    res.cookie("token", success.token, {
                        httpOnly: true,
                        secure: process.env.COOKIE_SECURE === "true",
                        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                    });
                    res.send(success)
                }
            ).catch((err) => {
                console.log(err)
                res.send(err)
            })
    })


CaptainRouter.post("/login",
    (req, res) => {
        console.log("hai login")
        const Result = new CaptainControllar().login(req.body)
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch((err) => {
                console.log(err)
                res.send(err)
            })
    })

CaptainRouter.get("/logout",
    (req, res) => {
        const Result = new CaptainControllar().logout(req.body, req.cookies.token)
            .then(
                (success) => {
                    res.clearCookie("token")
                    res.send(success)
                }

            ).catch((err) => {
                res.send(err)
            })
    }
)





module.exports = CaptainRouter;