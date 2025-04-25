import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import { CiViewTimeline } from 'react-icons/ci'
import { MdOutlineTimer } from 'react-icons/md'
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import FinishRide from './FinishRide';



function CaptainRide() {
    const [finishRide, SetFinishRide] = useState(false)


    const finishRideRef = useRef(null)




    useGSAP(function () {
        if (finishRide) {
            gsap.to(finishRideRef.current, {
                transform: "translateY(0)"

            })
        } else {
            gsap.to(finishRideRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [finishRide])



    return (
        <div className='h-screen relative overflow-hidden'>
            <img src="/Ubar.webp" alt="" className='w-[18vw] absolute top-2 left-4 ' />
            <div className='w-screen h-4/5'>
                <img src="/uber-map.webp" alt="" className='h-full w-full object-center' />
            </div>
            <div className='h-3/5 p-4 bg-yellow-500'>
                <h1 className='w-full'>
                    <RiArrowUpWideLine className='mx-auto text-4xl' onClick={() => SetFinishRide(true)} />
                </h1>
                <div>
                    <div className='flex justify-between p-4 items-center'>
                        <h1 className='text-xl font-bold'>4 KM Away</h1>
                        <button className='py-3 px-8 text-white bg-green-500 rounded-lg' onClick={() => SetFinishRide(true)}>Complete Ride</button>
                    </div>
                </div>
            </div>
            <div ref={finishRideRef} className='fixed w-full h-[70%] translate-y-full p-2 z-10 bottom-0 bg-white'>
                <RiArrowDownWideLine className='text-center w-full text-xl bg-gray-100 rounded-lg' onClick={() => {
                    SetFinishRide(false)
                }} />
                <FinishRide SetFinishRide={SetFinishRide} />
            </div>
        </div>
    )
}

export default CaptainRide
