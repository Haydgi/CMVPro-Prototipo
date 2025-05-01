import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Styles/global.css'; 

const isProd = import.meta.env.MODE === 'production';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={isProd ? '/CMVPro-Mockup' : '/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
