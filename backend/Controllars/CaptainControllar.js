const BlackListModel = require('../Models/BlackListModel');
const CaptainModel = require('../Models/CaptainModel');
const { generateUserPassword, GanrateToken, ComparePassword, VarifyToken } = require('../utilitis/UserAuth');

class CaptainControllar {
    create(data) {
        return new Promise(
            async (res, rej) => {
                console.log(data.vehicle.vehicalType)
                if (data.fullname !== null && data.email !== "" && data.password !== "" && data.vehicle !== null) {
                    try {
                        const findCaptain = await CaptainModel.findOne({ email: data.email })
                        if (findCaptain) {
                            rej({
                                status: 0,
                                msg: "email already exists"
                            })
                        } else {
                            const hashedPassword = await generateUserPassword(data.password)
                            const createdCaptain = await CaptainModel.create({
                                email: data.email,
                                fullname: {
                                    firstname: data.fullname.firstname,
                                    lastname: data.fullname.lastname
                                },
                                password: hashedPassword,
                                vehicle: {
                                    color: data.vehicle.color,
                                    plate: data.vehicle.plate,
                                    capacity: data.vehicle.capacity,
                                    vehicalType: data.vehicle?.vehicalType
                                }
                            })
                            createdCaptain.save()
                                .then(
                                    (success) => {
                                        const token = GanrateToken(createdCaptain.email, createdCaptain.role)
                                        res({
                                            status: 1,
                                            msg: "Captain created successfully",
                                            data: createdCaptain,
                                            token: token
                                        })
                                    }
                                ).catch((err) => {
                                    rej({
                                        status: 0,
                                        msg: "unable to create Captain please try again"
                                    })
                                })
                        }

                    } catch (err) {
                        console.log(err)
                        rej({
                            status: 0,
                            msg: "internal Server error"
                        })
                    }


                } else {
                    rej({
                        status: 0,
                        msg: "Please enter All fields"
                    })
                    return;
                }
            }
        )

    }
    login(data) {
        return new Promise(
            async (res, rej) => {
                if (data.email !== "" && data.password !== "") {
                    try {
                        const FindCaptain = await CaptainModel.findOne({ email: data.email }).select("+password")
                        if (!FindCaptain) {
                            rej(
                                {
                                    status: 0,
                                    msg: "not user exist please create a new Account",
                                }
                            )
                        } else {
                            const isMatch = await ComparePassword(FindCaptain.password, data.password)
                            if (!isMatch) {
                                rej(
                                    {
                                        status: 0,
                                        msg: "Invalid Email or Password",
                                    }
                                )
                            } else {
                                const token = GanrateToken(FindCaptain.email)
                                res(
                                    {
                                        status: 1,
                                        msg: "Login successfull",
                                        token: token,
                                        data: FindCaptain
                                    }
                                )
                            }
                        }
                    } catch (err) {
                        console.log(err)
                        rej({
                            status: 0,
                            msg: "internal Server error"
                        })
                    }
                } else {
                    rej({
                        status: 0,
                        msg: "Please enter email and password"
                    })
                    return;
                }
            }
        )
    }

    logout(data, Old_token) {
        return new Promise(
            async (res, rej) => {
                if (!Old_token) {
                    rej({
                        status: 0,
                        msg: "please login first"
                    })
                    return;
                } else {
                    try {
                        const FindToken = await BlackListModel.findOne({ token: Old_token })
                        if (FindToken) {
                            rej({
                                status: 0,
                                msg: "Token already used plase login again"
                            })
                            return;
                        } else {
                            const blackListToken = await BlackListModel.create({ token: Old_token })
                            blackListToken.save()
                            const token = VarifyToken(Old_token)
                            if (token.email && data.email && token.email === data.email) {
                                res({
                                    status: 1,
                                    msg: "Captain logged out successfully"
                                })
                            } else {
                                rej({
                                    status: 0,
                                    msg: "Unauthorized User"
                                })
                            }
                        }

                    } catch (err) {
                        rej({
                            status: 0,
                            msg: "Invalid Token"
                        })
                    }
                }
            }
        )
    }
}


module.exports = CaptainControllar;
