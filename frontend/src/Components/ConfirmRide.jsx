import axios from 'axios';
import React, { useContext, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiUserLocationFill } from "react-icons/ri";
import { MainContext } from '../MainContext';

function ConfirmRide({ SetLookingVehicle, user, SetConfirmVehicle, selctvehicle, destination, pickUp }) {
    const { RideBaseUrl, apiBaseUrl } = useContext(MainContext)

    const confirmRideHanlder = () => {

        axios.post(apiBaseUrl + RideBaseUrl + "/create-ride", {
            pickup: pickUp,
            destination,
            vehicletype: selctvehicle.vehicleType
        }, {
            params: {
                userId: user.data._id
            }
        }).then(
            (success) => {
                console.log(success)
                if (success.data.status === 1) {
                    SetLookingVehicle(true)
                    SetConfirmVehicle(false)
                } else {
                    console.log(success.data.msg)
                }
            }
        ).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <h1 className='font-semibold text-xl text-center'>Confirm Ride </h1>
            <div className='w-full mx-auto'>
                <img src={selctvehicle?.image} alt="" />
                <div className='p-4 mb-4'>
                    <div className='flex gap-2 items-center my-2'>
                        <RiUserLocationFill className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'>{pickUp}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className='flex gap-2 items-center my-2'>
                        <RiUserLocationFill className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'>{destination}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className='flex gap-2 items-center my-2'>
                        <MdOutlineCurrencyRupee className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'><span>{selctvehicle?.price}</span></h3>
                            <hr />
                        </div>
                    </div>
                </div>
                <button onClick={confirmRideHanlder} className='mb-4 bg-green-400 py-3 px-4 rounded-xl w-full mx-auto text-xl font-semibold text-white'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide
