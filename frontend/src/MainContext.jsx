
import React, { createContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContext = createContext()
const notify = (msg, flag) => toast(msg, { type: flag });

function Main(props) {
    const [ride, SetRide] = useState(null)
    const [finishRide, SetFinishRide] = useState(null)
    const apiBaseUrl = import.meta.env.VITE_API_BACKEND_BASE_URL;
    const UserBaseUrl = import.meta.env.VITE_API_USER_BASE_URL;
    const CaptainBaseUrl = import.meta.env.VITE_API_CAPTAIN_BASE_URL
    const locationBaseUrl = import.meta.env.VITE_API_LOCATION_BASE_URL
    const RideBaseUrl = import.meta.env.VITE_API_RIDE_BASE_URL
    console.log(apiBaseUrl,"apibase")
    console.log(UserBaseUrl,"user")
    console.log(CaptainBaseUrl,"captain")
    console.log(locationBaseUrl,"location")
    console.log(RideBaseUrl, "ride")
    return (
        <MainContext.Provider value={{ locationBaseUrl, finishRide, SetFinishRide, ride, SetRide, RideBaseUrl, apiBaseUrl, CaptainBaseUrl, UserBaseUrl, notify }}>
            <ToastContainer />
            {props.children}
        </MainContext.Provider>
    )
}

export default Main
export { MainContext }
