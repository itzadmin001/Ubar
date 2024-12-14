import React from 'react'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { RiUserLocationFill } from 'react-icons/ri'

function AsseptRide({ SetConfirmRide, SetaccesptRide, confrimRideHandler, ride }) {
    return (
        <div>
            <h1 className='font-semibold text-xl text-center mt-4'> New Ride Available</h1>
            <div className='w-full mx-auto p-4'>
                <div >
                    <div className='flex justify-between gap-2 items-center bg-yellow-500 p-4 rounded-xl'>
                        <div className='flex items-center gap-2'>
                            <img src="src/assets/captain-user.avif" alt="" className='w-10 rounded-full' />
                            <h1 className='text-sm font-semibold'>{ride?.user?.fullname.firstname + " " + ride?.user.fullname.lastname}</h1>
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
                            <h3 className='text-xl font-semibold'><span>{ride?.fare}</span></h3>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <button className='font-semibold text-xl py-2 px-5 rounded-md bg-gray-300' onClick={() => {
                        SetaccesptRide(false)
                        SetConfirmRide(false)
                    }}>Ignore</button>
                    <button className='font-semibold text-xl py-2 px-5 rounded-md bg-green-400 text-white' onClick={confrimRideHandler}>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default AsseptRide
