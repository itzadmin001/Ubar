const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require('http');
const { initializeSocket } = require('./Socket');
dotenv.config();

const PORT = process.env.PORT || 3000;
const FrontEndUrl = process.env.FRONTEND_BASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
const UserRouter = require('./Routers/UserRouter');
const cookieParser = require('cookie-parser');
const CaptainRouter = require('./Routers/CaptainRouter');
const LocationRouter = require("./Routers/LocationRouter");
const RideRouter = require('./Routers/RideRouter');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/captain", CaptainRouter);
app.use("/location", LocationRouter);
app.use("/ride", RideRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

mongoose.connect(DATABASE_NAME, {
    dbName: "Ubar",
}).then((success) => {
    console.log("Connected to MongoDB");

    // Create an HTTP server
    const server = http.createServer(app);

    // Initialize WebSocket server
    initializeSocket(server);

    // Start the HTTP server
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
    console.log("Db error: " + err);
});