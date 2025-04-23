import React, { useContext, useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../MainContext";
import axios from "axios"
import { CreateUser, isLocalToState } from "../Reducers/UserReducer"

function UserRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const { UserBaseUrl, apiBaseUrl, notify } = useContext(MainContext);
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const Navigate = useNavigate()


    useEffect(
        () => {
            if (user.data != null) {
                Navigate("/user-home")
            }

        }, [user])


    const UserRegisterHandler = (e) => {
        e.preventDefault();
        if (e.target.password.value !== e.target.confirm_password.value) {
            alert("Passwords do not match");
        } else {
            const userData = {
                fullname: {
                    firstname: e.target.firstname.value,
                    lastname: e.target.lastname.value,
                },
                email: e.target.email.value,
                password: e.target.password.value,
            };
            axios.post(apiBaseUrl + UserBaseUrl + "/register-user", userData, {
                withCredentials: true
            }).then(
                (success) => {
                    console.log(success);
                    if (success.data.status == 1) {
                        dispatch(CreateUser(success.data.data))
                        notify(success.data.msg, success.data.status ? "success" : "error");
                        Navigate("/user-home")

                    } else {

                        notify(success.data.msg, success.data.status ? "success" : "error");
                    }
                }
            ).catch(
                (err) => {
                    notify("Client side error ", "error");
                    console.log(err);
                }
            )
        }

        e.target.reset();
    };









    return (
        <div className="w-full h-screen bg-white flex flex-col justify-between px-2">
            <div className=" shadow-sm rounded-sm p-6">
                <img
                    src="/src/assets/Ubar.webp"
                    alt="Ubar Logo"
                    className="w-[20vw] p-1 mb-4"
                />
                <form onSubmit={UserRegisterHandler}>
                    <label htmlFor="email" className="block text-[4vw] font-semibold text-gray-700 mb-2">
                        What is your name?
                    </label>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                            <input
                                id="name"
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                className="w-full border border-gray-300 bg-gray-100  rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                        <div>

                            <input

                                id="lastname"
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                className="w-full border border-gray-300 bg-gray-100  rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-[4vw] font-semibold text-gray-700 mb-2">
                            What's is your email
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                className="w-full px-4 py-3 text-sm focus:outline-none bg-gray-100 "
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-xl font-semibold text-gray-700 mb-2">
                            Enter Password
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-lg mb-4">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                className="w-full px-4 py-3 bg-gray-100 text-[4vw] focus:outline-none "
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
                        <label htmlFor="password" className="block text-xl font-semibold text-gray-700 mb-4">
                            Confirm Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg mb-2">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                className="w-full px-4 py-3 bg-gray-100 text-[4vw] focus:outline-none "
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
                        Register
                    </button>
                </form>
                <div className="text-center mt-4 text-sm text-gray-600">
                    Do you have a Account?{" "}
                    <Link to={"/user-login"} className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default UserRegister;
