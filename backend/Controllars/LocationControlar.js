const axios = require('axios');
const { getDistanceTime } = require('../utilitis/Fare');

class locationController {
    async getcondinate(location) {
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

    async calculateFare(origin, destination, vehicleType = null) {
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
            throw new Error(error.message);
        }
    }
    async getSuggestions(location) {
        return new Promise(async (resolve, reject) => {
            try {
                const geoCodeUrl = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=5&limit=5&countrycodes=IN`;
                const response = await axios.get(geoCodeUrl);

                if (response.data && response.data.length > 0) {
                    // Extract relevant information (name, lat, lon)
                    const suggestions = response.data.map(item => ({
                        name: item.display_name,
                        lat: item.lat,
                        lon: item.lon,
                    }));

                    resolve(suggestions);
                } else {
                    reject('No suggestions found for the given location');
                }
            } catch (error) {
                reject(`Error: ${error.message}`);
            }
        });
    }
}



module.exports = locationController;
