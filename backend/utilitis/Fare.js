const axios = require("axios");
const CaptainModel = require("../Models/CaptainModel");


// Function to get distance and time
async function getDistanceTime(origin, destination) {
    try {
        // Geocoding for origin
        const originGeoCodeUrl = `https://nominatim.openstreetmap.org/search?q=${origin}&format=json`;
        const originResponse = await axios.get(originGeoCodeUrl);

        if (!originResponse.data || originResponse.data.length === 0) {
            throw new Error("Origin location not found");
        }
        const originLat = originResponse.data[0].lat;
        const originLng = originResponse.data[0].lon;

        // Geocoding for destination
        const destinationGeoCodeUrl = `https://nominatim.openstreetmap.org/search?q=${destination}&format=json`;
        const destinationResponse = await axios.get(destinationGeoCodeUrl);

        if (!destinationResponse.data || destinationResponse.data.length === 0) {
            throw new Error("Destination location not found");
        }
        const destinationLat = destinationResponse.data[0].lat;
        const destinationLng = destinationResponse.data[0].lon;

        // OSRM API for route
        const url = `http://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destinationLng},${destinationLat}`;
        const response = await axios.get(url, {
            params: {
                overview: "false",
            },
        });

        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const distance = route.distance / 1000; // Distance in kilometers
            const duration = route.duration / 3600; // Duration in hours

            return {
                distance: distance.toFixed(2), // in km
                duration: duration.toFixed(2), // in hours
            };
        } else {
            throw new Error("No route found");
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
}
async function getGeoCoordinates(location) {
    return new Promise(async (resolve, reject) => {
        if (!location) {
            reject('Please provide a location');
            return;
        }
        try {
            // OpenStreetMap API URL
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;

            // API Call
            const response = await axios.get(url);

            // Check if data exists
            if (response.data.length === 0) {
                return reject("Coordinates not found");
            }

            const { lat, lon } = response.data[0]; // lat and lon from the response

            // Resolve with lat and lon as ltd and lng
            resolve({ ltd: lat, lng: lon });
        } catch (error) {
            // Handle errors
            reject(`Error: ${error.message}`);
        }
    });
}

async function getcondinate(location) {
    return new Promise(async (resolve, reject) => {
        if (!location) {
            reject('Please provide a location');
            return;
        } else {
            try {
                // OpenStreetMap API URL
                const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;

                // API Call
                const response = await axios.get(url);

                // Check if data exists
                if (response.data.length === 0) {
                    return reject("Coordinates not found");
                }

                const { lat, lon } = response.data[0];

                resolve({ lat, lon });
            } catch (error) {
                // Handle errors
                reject(`Error: ${error.message}`);
            }
        }
    });
}

async function calculateFare(origin, destination, vehicleType = null) {
    try {
        const { distance, duration } = await getDistanceTime(origin, destination);

        // Vehicle rates (price per km and average speed)
        const vehicleRates = {
            UbarGo: { pricePerKm: 15, speed: 60 }, // Car: 15 INR per km, avg speed 60 km/hr
            Moto: { pricePerKm: 7, speed: 40 }, // Bike: 7 INR per km, avg speed 40 km/hr
            auto: { pricePerKm: 10, speed: 30 }, // Auto: 10 INR per km, avg speed 30 km/hr
        };

        // Function to calculate fare details for a vehicle
        const calculateDetails = (type) => {
            const { pricePerKm, speed } = vehicleRates[type];
            const price = Math.floor(distance * pricePerKm);
            const time = `${Math.floor(distance / speed)} hrs ${Math.ceil(((distance % speed) / speed) * 60)} mins`;
            return { vehicleType: type, distance: `${distance} km`, time, price };
        };

        if (vehicleType) {
            if (!vehicleRates[vehicleType]) {
                throw new Error("Invalid vehicle type. Use 'car', 'bike', or 'auto'.");
            }
            return calculateDetails(vehicleType); // Return only the selected vehicle's details
        }

        // Return all vehicle details by default
        const result = Object.keys(vehicleRates).map((type) => calculateDetails(type));
        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

// Function to calculate fare for different vehicles
async function getCaptainsInTheRadius(lat, lon, radius) {
    console.log(lat, lon, radius)
    // radius kilometers mein
    const captains = await CaptainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lon, lat], radius / 6371] // Radius ko kilometers mein convert karna
            }
        }
    })
    return captains; // Ye captains ko return karega jo radius ke andar hain
}

module.exports = { getDistanceTime, getCaptainsInTheRadius, calculateFare, getcondinate, getGeoCoordinates };
