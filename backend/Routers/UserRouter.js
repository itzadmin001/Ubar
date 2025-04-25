const express = require('express')
const UserRouter = express.Router()
const { Uservalidation } = require('../middleware/UserValidation')
const UserController = require('../Controllars/UserControllar')

UserRouter.get("/okay", (req, res) => {
    res.send("okay")
})

UserRouter.post("/register-user",
    Uservalidation,
    (req, res) => {
        console.log(req)
        const result = new UserController().create(req.body)
            .then(
                (success) => {
                    res.cookie("token", success.token, {
                        httpOnly: true,
                        secure: true,
                        secure: process.env.COOKIE_SECURE === "true",
                        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                    });
                    res.send(success)
                }
            ).catch(
                (err) => {
                    res.send(err)
                }
            )

    })

UserRouter.post("/login", (req, res) => {
    const result = new UserController().login(req.body)
        .then(
            (success) => {
                res.cookie("token", success.token)
                res.send(success)
            }
        ).catch(
            (err) => {
                res.send(err)
            }
        )
})

UserRouter.get("/logout",
    (req, res) => {
        const Result = new UserController().logout(req.body, req.cookies.token)
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

module.exports = UserRouter;
