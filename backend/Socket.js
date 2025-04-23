const { Server } = require("socket.io");
const UserModel = require("./Models/UserModel")
const CaptainModel = require("./Models/CaptainModel")

let io; // To store the socket.io instance

// Initialize the Socket.IO server
function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_BASE_URL,
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log("Join event received:", data);
            if (!userId || !userType) {
                console.error("Invalid data:", data);
                return;
            }
            try {
                if (userType === 'user') {
                    await UserModel.findOneAndUpdate({ _id: userId }, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await CaptainModel.findOneAndUpdate({ _id: userId }, { socketId: socket.id });
                }
            } catch (err) {
                console.error("Database error:", err);
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            console.log("Location update received:", data);

            // Validate location data
            if (!userId || !location || !location.ltd || !location.lng) {
                console.error("Invalid location data received:", data);
                return;
            }
            try {
                // Update the captain's location in the database
                await CaptainModel.findOneAndUpdate(
                    { _id: userId },
                    {
                        // GeoJSON format for location
                        $set: {
                            location: {
                                type: "Point",
                                coordinates: [location.lng, location.ltd]  // Longitude, Latitude format
                            }
                        }
                    }
                );
                console.log("Captain location updated successfully.");
            } catch (err) {
                console.error("Database error:", err);
            }
        });
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

// Send a message to a specific socket ID
function sendMessageToSocketId(socketId, messageObject) {
    if (io && io.sockets.sockets.get(socketId)) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        console.log(`Message sent to socket ID: ${socketId}`);
    } else {
        console.log(`Socket ID not found: ${socketId}`);
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId,
};
