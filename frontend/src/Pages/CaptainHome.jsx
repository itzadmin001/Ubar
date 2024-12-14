import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CiViewTimeline } from "react-icons/ci";
import { MdOutlineTimer } from "react-icons/md";
import { RiArrowDownWideLine } from 'react-icons/ri';
import AsseptRide from '../Components/AsseptRide';
import ConfirmOtp from '../Components/ConfirmOtp';
import FinishRide from '../Components/FinishRide';
import { useSelector } from 'react-redux';
import { SocketContext } from "../SocketContext"
import axios from "axios"
import { MainContext } from '../MainContext';
function CaptainHome() {
    const captain = useSelector((state => state.captain))
    const [accessptRide, SetaccesptRide] = useState(false)
    const [ConfirmRide, SetConfirmRide] = useState(false)
    const [ride, SetRide] = useState(null)
    const { RideBaseUrl, apiBaseUrl, finishRide, SetFinishRide } = useContext(MainContext)
    const { newSocket } = useContext(SocketContext)



    const accessptRideRef = useRef(null)
    const confirmRideRef = useRef(null)



    useGSAP(function () {
        if (accessptRide) {
            gsap.to(accessptRideRef.current, {
                transform: "translateY(0)"

            })
        } else {
            gsap.to(accessptRideRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [accessptRide])


    useGSAP(function () {
        if (ConfirmRide) {
            gsap.to(confirmRideRef.current, {
                transform: "translateY(0)"

            })
        } else {
            gsap.to(confirmRideRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [ConfirmRide])

    useEffect(() => {
        if (captain && captain.data && captain.data._id) {
            const captainId = captain.data._id;
            newSocket.emit('join', { userType: "captain", userId: captainId });
        }
    }, [captain, newSocket]);

    useEffect(() => {
        const updateLocation = () => {
            if (navigator.geolocation && captain && captain.data && captain.data._id) {
                navigator.geolocation.getCurrentPosition(position => {
                    newSocket.emit('update-location-captain', {
                        userId: captain.data._id,
                        location: {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        }
                    });
                }, error => {
                    console.error("Error getting location:", error);
                });
            }
        };

        const locationInterval = setInterval(updateLocation, 10000);
        return () => clearInterval(locationInterval);
    }, [captain, newSocket]);


    newSocket.on('new-ride', (data) => {
        console.log(data)
        SetRide(data)
        SetaccesptRide(true)
    })

    const confrimRideHandler = () => {
        axios.post(apiBaseUrl + RideBaseUrl + "/confirm-ride", {}, {
            params: {
                rideId: ride._id,
                captainId: captain.data._id
            }
        }).then(
            (success) => {
                if (success.data.status === 1) {
                    SetConfirmRide(true)
                    SetaccesptRide(false)
                } else {
                    console.log(success.data.msg)
                }
                console.log(success)
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='h-screen relative overflow-hidden'>
            <img src="src/assets/Ubar.webp" alt="" className='w-[18vw] absolute top-2 left-4 ' />
            <div className='w-screen h-3/5'>
                <img src="src/assets/uber-map.webp" alt="" className='h-full w-full object-center' />
            </div>
            <div className='h-2/5 p-6'>
                <div>
                    <div className='flex justify-between '>
                        <div className='flex  items-center gap-2'>
                            <img src="src/assets/captain-user.avif" alt="" className='w-10 rounded-full' />
                            <h1 className='text-xl font-semibold'>Harsh Patel</h1>
                        </div>
                        <div >
                            <h1 className='text-xl font-semibold'>₹356.99</h1>
                            <h6 className='bg-yellow-400 px-2 rounded-2xl font-semibold'>Earned</h6>
                        </div>
                    </div>

                    <div className=' bg-gray-100 rounded-lg p-4 flex items-center gap-2 justify-center mt-10'>
                        <div className='flex flex-col items-center'>
                            <CiViewTimeline className='text-2xl font-semibold' />
                            <h1 className='text-xl font-semibold'>10.2</h1>
                            <p>hourse online</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <MdOutlineTimer className='text-2xl font-semibold' />
                            <h1 className='text-xl font-semibold'>10.2</h1>
                            <p>hourse online</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <MdOutlineTimer className='text-2xl font-semibold' />
                            <h1 className='text-xl font-semibold'>10.2</h1>
                            <p>hourse online</p>
                        </div>

                    </div>
                </div>
            </div>
            <div ref={accessptRideRef} className='fixed w-full translate-y-full p-2 z-10 bottom-0 bg-white'>
                <RiArrowDownWideLine className='text-center w-full text-xl bg-gray-100 rounded-lg' onClick={() => {
                    SetaccesptRide(false)
                }} />
                <AsseptRide SetConfirmRide={SetConfirmRide} confrimRideHandler={confrimRideHandler} SetaccesptRide={SetaccesptRide} ride={ride} />
            </div>
            <div ref={confirmRideRef} className='fixed w-full translate-y-full p-2 z-10 bottom-0 bg-white'>
                <RiArrowDownWideLine className='text-center w-full text-xl bg-gray-100 rounded-lg' onClick={() => {
                    SetConfirmRide(false)
                }} />
                <ConfirmOtp finishRide={finishRide} SetFinishRide={SetFinishRide} RideBaseUrl={RideBaseUrl} apiBaseUrl={apiBaseUrl} SetConfirmRide={SetConfirmRide} SetaccesptRide={SetaccesptRide} ride={ride} />
            </div>


        </div>
    )
}

export default CaptainHome
