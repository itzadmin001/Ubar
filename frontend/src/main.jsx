import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import { store } from './Store/Store.js';
import MainContext from './MainContext';
import SocketProvider from './SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <MainContext>
        <SocketProvider>
          <App />
        </SocketProvider>
      </MainContext>
    </Provider>
  </StrictMode>
);
