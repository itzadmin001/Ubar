import { useGSAP } from '@gsap/react'
import { useContext, useEffect } from 'react'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { RiUserLocationFill } from 'react-icons/ri'
import { MainContext } from '../MainContext'
import { SocketContext } from "../SocketContext"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function FinishRide({ SetFinishRide }) {
    const { finishRide, apiBaseUrl, locationBaseUrl, notify, RideBaseUrl, } = useContext(MainContext)
    const { newSocket } = useContext(SocketContext)

    const Navigate = useNavigate()

    console.log(finishRide)

    const finishRideHandler = (e) => {
        e.preventDefault();

        axios.post(apiBaseUrl + RideBaseUrl + "/finish-ride",
            {}, {
            params: { rideId: finishRide.data._id, captainId: finishRide.data.captain._id }
        }).then((success) => {
            if (success.data.status === 1) {
                Navigate("/captain-home")
                console.log(success)
            }
        }).catch((err) => {
            console.log(err)
        })

    }


    return (
        <div >
            <h1 className='font-semibold text-xl text-center mt-4'> Finish The Ride</h1>
            <div className='w-full mx-auto p-4'>
                <div >
                    <div className='flex justify-between gap-2 items-center bg-yellow-500 p-4 rounded-xl'>
                        <div className='flex items-center gap-2'>
                            <img src="/captain-user.avif" alt="" className='w-10 rounded-full' />
                            <h1 className='text-xl font-semibold'>{finishRide?.data.user.fullname.firstname + " " + finishRide?.data.user.fullname.lastname}</h1>
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
                            <h3 className='text-xl font-semibold'>{finishRide?.data.pickup}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className='flex gap-2 items-center my-2'>
                        <RiUserLocationFill className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'>{finishRide?.data.destination}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className='flex gap-2 items-center my-2'>
                        <MdOutlineCurrencyRupee className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'><span>{finishRide?.data.fare}</span></h3>
                            <hr />
                        </div>
                    </div>
                </div>
                <form className='flex justify-between' onSubmit={finishRideHandler}>
                    <button className='font-semibold w-full text-xl py-3 px-5 rounded-md bg-green-400 text-white' onClick={() => {
                        SetFinishRide(false)
                    }}>Finish Ride</button>
                </form>
                <p className='p-4 text-red-300'>if only click finish button when ride will we complete !</p>
            </div>
        </div>
    )
}

export default FinishRide
