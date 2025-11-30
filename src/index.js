import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import App.jsx Anda

// Menemukan elemen div dengan id="root" dari public/index.html
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Merender komponen App ke dalam root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
