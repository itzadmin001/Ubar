import React from 'react'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { RiUserLocationFill } from 'react-icons/ri'

function WatingforDriver({ ride }) {
    return (
        <div>
            <div className='w-full mx-auto'>
                <div className='flex items-center justify-between p-4'>
                    <img src="/Uber-car.png" alt="" className='w-52' />
                    <div className='flex flex-col items-end'>
                        <h2 className='font-semibold text-xl'>{ride?.captain?.fullname?.firstname + " " + ride?.captain?.fullname?.lastname}</h2>
                        <h1 className='font-semibold text-xl'>{ride?.captain?.vehicle?.plate}</h1>
                        <h5 className='text-zinc-600 font-semibold'>{ride?.captain?.vehicle?.vehicalType}</h5>
                        <h5 className='text-zinc-800 font-semibold'>{ride?.otp}</h5>
                    </div>
                </div>
                <div className='p-4 mb-4'>
                    <div className='flex gap-2 items-center my-3'>
                        <RiUserLocationFill className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'>{ride?.pickup}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className='flex gap-2 items-center my-3'>
                        <MdOutlineCurrencyRupee className='text-xl' />
                        <div className='flex justify-center flex-col '>
                            <h3 className='text-xl font-semibold'> <span>{ride?.fare}</span></h3>
                            <h5 className='font-semibold'>Cash Pay</h5>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatingforDriver
