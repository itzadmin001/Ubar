import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RiArrowDownWideLine } from "react-icons/ri";
import LocationShearch from "../Components/LocationShearch";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import { MainContext } from "../MainContext"
import { SocketContext } from "../SocketContext";
import axios from "axios";
import WatingforDriver from "../Components/WatingforDriver";

let debounceTimer;

function UserHome() {
    const user = useSelector((state) => state.user);
    const { apiBaseUrl, locationBaseUrl, notify, RideBaseUrl, ride, SetRide } = useContext(MainContext);
    const { newSocket } = useContext(SocketContext);
    const [pickUp, SetpickUp] = useState("");
    const [destination, Setdestination] = useState("");
    const [openPanle, SetOpenPanle] = useState(false);
    const [vehiclePanle, SetVehiclePanle] = useState(false);
    const [ConfirmVehicle, SetConfirmVehicle] = useState(false);
    const [lookingVehicle, SetLookingVehicle] = useState(false);
    const [suggstion, Setsuggstion] = useState([""]);
    const [Vehicledata, SetVehicledata] = useState([])
    const [selctvehicle, SetSelctVehicle] = useState(null)
    const [wattingForDriver, SetWattingForDriver] = useState(false);



    const Navigate = useNavigate();
    const PanelRef = useRef(null);
    const vehicleRef = useRef(null);
    const confirmRef = useRef(null);
    const lookingforRef = useRef(null);
    const wattingForRef = useRef(null);



    newSocket.on('ride-confirmed', (result) => {
        SetLookingVehicle(false)
        SetWattingForDriver(true)
        console.log(result, "result hai re")
        SetRide(result.data)
    })

    newSocket.on('ride-started', (result) => {
        SetWattingForDriver(false)
        console.log(result, "result hai otp ka")
        Navigate("/riding")
    })

    const fetchSuggestions = (query) => {
        if (!query) return;
        axios
            .post(`${apiBaseUrl}${locationBaseUrl}/get-suggestions`, {
                params: { location: query },
            })
            .then((response) => {
                Setsuggstion(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // डेबाउंस लागू करना
    const handleInputChange = (setter, value) => {
        setter(value);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fetchSuggestions(value);
        }, 500);
    };

    useGSAP(function () {
        if (openPanle) {
            gsap.to(PanelRef.current, {
                height: "70%",
                opacity: 1,
                padding: "40px",
            });
        } else {
            gsap.to(PanelRef.current, {
                height: "0%",
                opacity: 0,
                padding: "0",
            });
        }
    }, [openPanle]);

    useGSAP(function () {
        if (vehiclePanle) {
            gsap.to(vehicleRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(vehicleRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [vehiclePanle]);

    useGSAP(function () {
        if (ConfirmVehicle) {
            gsap.to(confirmRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(confirmRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [ConfirmVehicle]);



    useEffect(() => {
        if (!user.data) {
            Navigate("/user-login");
        }
    }, [user]);

    useGSAP(function () {
        if (lookingVehicle) {
            gsap.to(lookingforRef.current, {
                transform: "translateY(0)",
                opacity: 1,
            });

        } else {
            gsap.to(lookingforRef.current, {
                transform: "translateY(100%)",
                opacity: 0,
            });
        }
    }, [lookingVehicle]);

    useGSAP(function () {
        if (wattingForDriver) {
            gsap.to(wattingForRef.current, {
                transform: "translateY(0)",
                opacity: 1,
            });

        } else {
            gsap.to(wattingForRef.current, {
                transform: "translateY(100%)",
                opacity: 0,
            });
        }
    }, [wattingForDriver]);


    const getVehicleHandler = (e) => {
        e.preventDefault();
        SetVehiclePanle(true);
        const data = {
            pickUpLocation: pickUp,
            destinationLocation: destination,
        }
        if (data.pickUpLocation !== "" && data.destinationLocation !== "") {
            axios.post(`${apiBaseUrl}${locationBaseUrl}/get-distance`, data)
                .then((success) => {
                    SetVehicledata(success.data)
                }).catch((err) => {
                    console.log(err)
                    notify("No vehicle available in this area.", "error");

                })
        } else {
            console.log("No vehicle available in this area.")
            notify("No vehicle available in this area.", "error");
        }

    }
    useEffect(() => {
        if (user && user.data && user.data._id) {
            const userId = user.data._id;
            newSocket.emit('join', { userType: "user", userId });
        }
    }, [user, newSocket]);


    return (
        <div className="h-screen relative overflow-hidden">
            <div className="h-screen w-screen">
                <img
                    src="src/assets/uber-map.webp"
                    alt="Map"
                    className="h-full w-full object-center"
                />
            </div>
            <div className="absolute top-0 h-screen flex flex-col justify-end w-full">
                <div className="bg-white p-5 relative h-[30%]">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">Find a Trip</h4>
                        <RiArrowDownWideLine
                            className={`text-xl duration-300 ${openPanle ? "rotate-180" : "rotate-0"
                                }`}
                            onClick={() => SetOpenPanle(false)}
                        />
                    </div>
                    <form className="relative " onSubmit={getVehicleHandler}>
                        <div className="h-20 w-1 bg-gray-800 absolute top-8 left-4 rounded-xl"></div>
                        <input
                            onClick={() => SetOpenPanle(true)}
                            type="text"
                            value={pickUp}
                            onChange={(e) => handleInputChange(SetpickUp, e.target.value)}
                            placeholder="Enter Pick up location"
                            className="w-full bg-gray-100 px-8 py-2 mt-5 rounded-lg"
                            required
                        />
                        <input
                            value={destination}
                            onChange={(e) => handleInputChange(Setdestination, e.target.value)}
                            type="text"
                            placeholder="Enter destination location"
                            className="w-full bg-gray-100 px-8 py-2 mt-5 rounded-lg"
                            required
                        />
                        <button className=" w-full bg-black text-white py-3 px-4 rounded-lg mt-5" >Find a vehicle</button>
                    </form>
                </div>
                <div className="bg-white" ref={PanelRef}>
                    <LocationShearch
                        suggstion={suggstion}
                        SetpickUp={SetpickUp}
                        SetOpenPanle={SetOpenPanle}
                        SetVehiclePanle={SetVehiclePanle}
                    />
                </div>
                <div ref={vehicleRef} className="fixed w-full translate-y-full p-2 z-10 bottom-0 bg-white">
                    <RiArrowDownWideLine
                        className="text-center w-full text-xl bg-gray-100 rounded-lg"
                        onClick={() => SetVehiclePanle(false)}
                    />
                    <VehiclePanel SetConfirmVehicle={SetConfirmVehicle} SetVehiclePanle={SetVehiclePanle} Vehicledata={Vehicledata} SetSelctVehicle={SetSelctVehicle} />
                </div>
                <div ref={confirmRef} className="fixed w-full translate-y-full p-2 z-30 bottom-0 bg-white">
                    <RiArrowDownWideLine
                        className="text-center w-full text-xl bg-gray-100 rounded-lg"
                        onClick={() => SetConfirmVehicle(false)}
                    />
                    <ConfirmRide
                        pickUp={pickUp}
                        destination={destination}
                        selctvehicle={selctvehicle}
                        SetLookingVehicle={SetLookingVehicle}
                        SetConfirmVehicle={SetConfirmVehicle}
                        user={user}
                    />
                </div>
                <div ref={lookingforRef} className="fixed w-full translate-y-[100%] p-2 z-10 bottom-0 bg-white">
                    <RiArrowDownWideLine
                        className="text-center w-full text-xl bg-gray-100 rounded-lg"
                        onClick={() => {
                            SetConfirmVehicle(false)
                            SetLookingVehicle(false)
                        }}
                    />
                    <LookingForDriver Vehicledata={Vehicledata} SetSelctVehicle={SetSelctVehicle} selctvehicle={selctvehicle} pickUp={pickUp} destination={destination} />
                </div>
                <div ref={wattingForRef} className="fixed w-full translate-y-[100%] p-2 z-10 bottom-0 bg-white">
                    <RiArrowDownWideLine
                        className="text-center w-full text-xl bg-gray-100 rounded-lg"
                        onClick={() => {
                            SetConfirmVehicle(false)
                            SetLookingVehicle(false)
                        }}
                    />
                    <WatingforDriver ride={ride} />
                </div>
            </div>
        </div>
    );
}

export default UserHome;
