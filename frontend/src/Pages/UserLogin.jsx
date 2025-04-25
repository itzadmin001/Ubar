import React, { useContext, useEffect, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Userlogin } from "../Reducers/UserReducer"
import { MainContext } from "../MainContext";
import axios from "axios";

function UserLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const { UserBaseUrl, apiBaseUrl, notify } = useContext(MainContext);
    const user = useSelector((state => state.user))


    const dispatch = useDispatch()
    const Navigate = useNavigate()


    useEffect(() => {
        if (user.data !== null) {
            Navigate("/user-home")
        } else {
            Navigate("/user-login")
        }
    }, [user])


    const UserloginHandler = (e) => {
        e.preventDefault()
        const newdata = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        if (newdata.email !== "" && newdata.password !== "") {

            axios.post(apiBaseUrl + UserBaseUrl + "/login", newdata)
                .then(
                    (success) => {
                        if (success.data.status === 1) {
                            notify(success.data.msg, success.data.status ? "success" : "error")
                            Navigate("/user-home")
                            dispatch(Userlogin(success.data.data))
                        } else {
                            notify(success.data.msg, success.data.status ? "success" : "error")
                        }
                    }
                ).catch((err) => {
                    console.log(err)
                    notify("Invalid email or password", "error")
                })
        } else {
            notify("Please fill in all the fields", "error")
        }
    }


    console.log(user);





    return (
        <div className="w-full h-screen bg-white flex flex-col justify-between px-2">
            <div className=" shadow-sm rounded-sm p-6">
                <img
                    src="/Ubar.webp"
                    alt="Ubar Logo"
                    className="w-[28vw] p-1 mb-6"
                />
                <form onSubmit={UserloginHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-xl font-semibold text-gray-700 mb-2">
                            What's your email?
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-xl font-semibold text-gray-700 mb-2">
                            Enter Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                className="w-full px-4 py-2 text-sm focus:outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-2 text-gray-500"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full  bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4 text-sm text-gray-600">
                    New here?{" "}
                    <Link to={"/user-register"} className="text-blue-500 hover:underline">
                        Create new Account
                    </Link>
                </div>
            </div>
            <Link
                to={"/captain-login"}
                type="button"
                className="flex items-center justify-center w-full bg-green-500 mb-6 text-white py-4  rounded-lg hover:bg-green-600 transition duration-300"
            >
                Sign in as Captain
            </Link>
        </div>
    );

}

export default UserLogin
