import React from 'react'
import { FaUser } from "react-icons/fa6";
function VehiclePanel({ SetConfirmVehicle, SetVehiclePanle, Vehicledata, SetSelctVehicle }) {

    const staticImages = [
        'src/assets/Uber-car.png',
        'src/assets/Ubar-bike.webp',
        'src/assets/ubar-auto.webp'
    ];
    return (
        <div>
            {
                Vehicledata?.map((veh, i) => {
                    return (
                        <div key={i} onClick={() => {
                            SetConfirmVehicle(true)
                            SetSelctVehicle({
                                vehicleType: veh.vehicleType,
                                distance: veh.distance,
                                time: veh.time,
                                price: veh.price,
                                image: veh.image || staticImages[i % staticImages.length]
                            })
                            SetVehiclePanle(false)
                        }} className='flex items-center justify-between p-4 border-2 border-white active:border-black rounded-xl'>
                            <img src={veh?.image || staticImages[i % staticImages.length]} alt="" className='w-[25vw]' />
                            <div className=' flex flex-col'>
                                <div className='flex items-center  gap-2'>
                                    <h1>{veh.vehicleType}</h1>
                                </div>
                                <h3>{veh.distance}</h3>
                                <h6 className='text-zinc-400'>{veh.time}</h6>
                            </div>
                            <h3 className='font-semibold text-xl'>₹ <span>{veh.price}</span></h3>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default VehiclePanel
