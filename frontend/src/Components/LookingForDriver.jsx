import React from 'react'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import { RiUserLocationFill } from 'react-icons/ri'

function LookingForDriver({ Vehicledata, pickUp, destination, selctvehicle }) {
    return (
        <div>
            <h1 className='font-semibold text-xl text-center mt-4'>Looking For A Driver</h1>
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
            </div>
        </div>
    )
}

export default LookingForDriver
