import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const newSocket = io(import.meta.env.VITE_API_BACKEND_BASE_URL, {
    transports: ['websocket'],
});
const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(newSocket);
        newSocket.on('connect', () => {
            console.log('Connected to server:', newSocket.id);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);


    return (
        <SocketContext.Provider value={{ newSocket }}>
            {children}
        </SocketContext.Provider>
    );
};



export default SocketProvider;
export { SocketContext }
