import axios from 'axios'
import React, { useContext } from 'react'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { RiUserLocationFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { MainContext } from '../MainContext'



function ConfirmOtp({ SetaccesptRide, RideBaseUrl, apiBaseUrl, ride, SetConfirmRide }) {
    const { finishRide, SetFinishRide } = useContext(MainContext)

    const Navigate = useNavigate()

    const otpconfirmHandler = (e) => {
        e.preventDefault();
        const otp = e.target.otp.value
        if (!otp) {
            alert("Please enter OTP");

        } else {
            axios.get(apiBaseUrl + RideBaseUrl + "/confirm-otp", { params: { otp, rideId: ride._id } })
                .then((success) => {
                    console.log(success);
                    SetFinishRide(success.data)
                    if (success.data.status === 1) {
                        Navigate('/captain-riding')
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }

    }
    return (
        <div>
            <h1 className='font-semibold text-xl text-center mt-4'> Confirm this ride to Start</h1>
            <div className='w-full mx-auto p-4'>
                <div >
                    <div className='flex justify-between gap-2 items-center border-2 border-yellow-500 p-4 rounded-xl'>
                        <div className='flex items-center gap-2'>
                            <img src="src/assets/captain-user.avif" alt="" className='w-10 rounded-full' />
                            <h1 className='text-xl font-semibold'>{ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}</h1>
                        </div>
                        <div >
                            <h1 className='text-xl font-semibold'>23.94 Km</h1>
                        </div>
                    </div>
                </div>
                <div className='p-4 mb-4'>
                    <div className='flex gap-2 items-center my-2'>
                        <RiUserLocationFill className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'>{ride?.pickup}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className='flex gap-2 items-center my-2'>
                        <RiUserLocationFill className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'>{ride?.destination}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className='flex gap-2 items-center my-2'>
                        <MdOutlineCurrencyRupee className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'> <span>{ride?.fare}</span></h3>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className='mb-5 '>
                    <form onSubmit={otpconfirmHandler}>
                        <input type="otp" name='otp' required placeholder='Enter OTP' className='mb-4 py-3 px-4 bg-gray-100 w-full text-xl rounded-lg' maxLength={6} />
                        <div className='flex flex-col gap-4'>
                            <button className=' text-center font-semibold text-xl py-2 px-5 rounded-md bg-green-400 text-white' onClick={() => {
                                SetConfirmRide(true)
                                SetaccesptRide(false)
                            }}>Confirm</button>
                            <button className='font-semibold text-xl py-2 px-5 rounded-md bg-gray-300' onClick={() => {
                                SetaccesptRide(false)
                                SetConfirmRide(false)
                            }}>Cancle</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ConfirmOtp
