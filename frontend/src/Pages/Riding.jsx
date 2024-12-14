import React, { useContext } from 'react'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { RiUserLocationFill } from 'react-icons/ri'
import { MainContext } from '../MainContext';
import { SocketContext } from "../SocketContext"
import { useNavigate } from 'react-router-dom';

function Riding() {
    const { ride, SetRide } = useContext(MainContext);
    const { newSocket } = useContext(SocketContext)


    const Navigate = useNavigate()


    newSocket.on('ride-finished', (data) => {
        Navigate('/user-home')
    })

    return (
        <div className='h-screen w-full'>
            <div className=' h-1/2'>
                <img src="src/assets/uber-map.webp" alt="" className='h-full w-full object-center' />
            </div>
            <div className='w-full mx-auto'>
                <div className='flex items-center justify-between p-4'>
                    <img src="src/assets/Uber-car.png" alt="" className='w-52' />
                    <div className='flex flex-col items-end'>
                        <h2 className='font-semibold text-xl'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
                        <h1 className='font-semibold text-xl'>{ride?.captain.vehicle.plate}</h1>
                        <h5 className='text-zinc-600 font-semibold'>{ride?.captain.vehicle.vehicalType}</h5>
                    </div>
                </div>
                <div className='p-4 mb-4'>
                    <div className='flex gap-2 items-center my-3'>
                        <RiUserLocationFill className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'>{ride?.destination}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className='flex gap-2 items-center my-3'>
                        <MdOutlineCurrencyRupee className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'><span>{ride?.fare}</span></h3>
                            <h5 className='font-semibold'>Cash Pay</h5>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            <button className='mb-4 bg-green-400 py-3 px-4 rounded-xl w-full mx-auto text-xl font-semibold text-white'>Pay Now </button>

        </div>
    )
}

export default Riding
