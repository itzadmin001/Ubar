const CaptainModel = require('../Models/CaptainModel');
const UserModel = require('../Models/UserModel');
const { generateUserPassword, GanrateToken, ComparePassword, VarifyToken } = require('../utilitis/UserAuth');
const BlackListModel = require('../Models/BlackListModel');




class UserController {
    create(data) {
        return new Promise(
            async (resolve, reject) => {
                if (data.fullname === null && data.email === "" && data.password === "") {
                    reject(
                        {
                            status: 0,
                            msg: "Please enter All fields"
                        }
                    )
                    return;
                } else {
                    try {
                        const findUser = await UserModel.findOne({ email: data.email })
                        if (findUser) {
                            reject({
                                status: 0,
                                msg: "email already exists"
                            })
                        } else {
                            const HashPassword = await generateUserPassword(data.password)
                            const CreateUser = await UserModel.create({
                                email: data.email,
                                fullname: {
                                    firstname: data.fullname.firstname,
                                    lastname: data.fullname.lastname
                                },
                                password: HashPassword
                            })
                            CreateUser.save()
                                .then(
                                    (success) => {
                                        const token = GanrateToken(CreateUser.email, CreateUser.role)
                                        resolve({
                                            status: 1,
                                            msg: "User created successfully",
                                            data: CreateUser,
                                            token: token
                                        })

                                    }
                                ).catch(
                                    (err) => {
                                        reject({
                                            status: 0,
                                            msg: "Error in saving user data"
                                        })
                                    }
                                )
                        }
                    } catch (err) {
                        console.log(err)
                        reject(
                            {
                                status: 0,
                                msg: "internal Server error"
                            }
                        )
                    }
                }



            })
    }
    login(data) {
        return new Promise(
            async (res, rej) => {
                if (data.email === "" && data.password === "") {
                    rej({
                        status: 0,
                        msg: "Please enter email and password"
                    })
                    return;
                } else {
                    try {
                        const findUser = await UserModel.findOne({ email: data.email })
                        if (!findUser) {
                            rej({
                                status: 0,
                                msg: "User not Exits"
                            })
                        } else {
                            const isMatch = await ComparePassword(findUser.password, data.password)
                            if (!isMatch) {
                                rej({
                                    status: 0,
                                    msg: "Invalid Email or Password"
                                })
                            } else {
                                const token = GanrateToken(findUser.email, findUser.role)
                                res({
                                    status: 1,
                                    msg: "User logged in successfully",
                                    token: token,
                                    data: findUser
                                })
                            }
                        }

                    } catch (err) {
                        rej({
                            status: 0,
                            msg: "internal Server error"
                        })
                    }
                }
            }
        )

    }
    logout(data, Old_token) {
        return new Promise(
            async (res, rej) => {
                if (Old_token !== null) {
                    try {
                        const findtoken = await BlackListModel.findOne({ token: Old_token })
                        if (findtoken) {
                            rej({
                                status: 0,
                                msg: "Token is Blacklisted please Login again"
                            })
                            return;

                        } else {
                            const BlackListToken = await BlackListModel.create({ token: Old_token })
                            BlackListToken.save()
                            const token = VarifyToken(Old_token)
                            if (token.email && data.email && token.email === data.email) {
                                res({
                                    status: 1,
                                    msg: "User logged out successfully"
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
                } else {
                    rej({
                        status: 0,
                        msg: "UnAuthorized User Please Log in First"
                    })
                }


            })
    }

}

module.exports = UserController;