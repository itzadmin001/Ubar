import React, { useContext, useEffect, useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios"
import { MainContext } from '../MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { Createcaptain } from '../Reducers/CaptainReducer';

function CaptainRegister() {
    const captain = useSelector(state => state.captain);
    const { CaptainBaseUrl, apiBaseUrl, notify } = useContext(MainContext)
    const [showPassword, setShowPassword] = useState(false);
    const [vehicletype, SetvehicleType] = useState(null);

    const dispatch = useDispatch()
    const Navigate = useNavigate()


    useEffect(() => {
        if (captain.data != null) {
            Navigate("/captain-home")
        }

    }, [captain])


    const CaptainRegisterHandler = (e) => {
        e.preventDefault();
        const data = {
            fullname: {
                firstname: e.target.firstname.value,
                lastname: e.target.lastname.value,
            },
            email: e.target.email.value,
            password: e.target.password.value,
            vehicle: {
                color: e.target.color.value,
                plate: e.target.plate.value,
                capacity: e.target.capacity.value,
                vehicalType: vehicletype
            }
        };
        console.log(data)
        if (data.fullname != null && data.email != "" && data.password != "" && data.vehicle != "") {
            axios.post(apiBaseUrl + CaptainBaseUrl + "/register", data, {
                withCredentials: true
            }).then(
                (success) => {
                    if (success.data.status === 1) {
                        console.log(success.data)
                        notify(success.data.msg, success.data.status ? "success" : "error");
                        dispatch(Createcaptain(success.data.data))


                    } else {
                        notify(success.data.msg, success.data.status ? "success" : "error");
                    }
                }
            ).catch((err) => {
                notify("Registration failed, please try again", "error")
            })


        } else {
            notify("Please enter all required fields", "error")
        }
    }






    return (
        <div className="w-full h-screen bg-white flex flex-col justify-between px-2">
            <div className=" shadow-sm rounded-sm p-6">
                <img
                    src="/Ubar.webp"
                    alt="Ubar Logo"
                    className="w-[28vw] p-1 mb-4"
                />
                <form onSubmit={CaptainRegisterHandler}>
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-xl font-semibold text-gray-700 mb-2">
                            What's your fullname? Captain👋
                        </label>
                        <div className='grid grid-cols-2 gap-5'>
                            <input
                                id=""
                                type="text"
                                name='firstname'
                                placeholder="First Name"
                                className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                            />
                            <input
                                id=""
                                type="text"
                                name='lastname'
                                placeholder="Last name"
                                className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-xl font-semibold text-gray-700 mb-2">
                            What's your Email?
                        </label>
                        <input
                            id="email"
                            type="email"
                            name='email'
                            placeholder="email@example.com"
                            className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="block text-xl font-semibold text-gray-700 mb-2">
                            Enter Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                className="w-full px-4 bg-gray-100 py-2 text-sm focus:outline-none"
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
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-xl font-semibold text-gray-600 mb-3">
                            Vehicle information?
                        </label>
                        <div className='grid grid-cols-2 gap-5 mb-4'>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">
                                    Enter color name?
                                </label>
                                <input
                                    id="color"
                                    type="text"
                                    name='color'
                                    placeholder="Enter color name"
                                    className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                                    required
                                />
                            </div>
                            <div >
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">
                                    Enter plate number?
                                </label>
                                <input
                                    id="plate"
                                    type="text"
                                    name='plate'
                                    placeholder="Enter plate number"
                                    className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">
                                    Enter capacity (1/2/4)?
                                </label>
                                <input
                                    id="capacity"
                                    type="text"
                                    name='capacity'
                                    placeholder="capacity"
                                    className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">
                                    Enter vehical Type?
                                </label>
                                <select name="" id="" onChange={(e) => SetvehicleType(e.target.value)} defaultValue={"Select Model"} className="w-full border bg-gray-100 border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200">
                                    <option value="null">
                                        Select Model
                                    </option>
                                    <option value="bike">
                                        bike
                                    </option>
                                    <option value="car">
                                        Car
                                    </option>
                                    <option value="auto">
                                        Auto
                                    </option>
                                </select>
                            </div>
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
                    do you have alredy account?{" "}
                    <Link to={"/captain-login"} className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
            <Link
                to={"/user-register"}
                type="button"
                className="flex items-center justify-center w-full bg-yellow-500 mb-6 text-white py-4  rounded-lg hover:bg-green-600 transition duration-300"
            >
                Sign in as User
            </Link>
        </div>
    );
}

export default CaptainRegister
