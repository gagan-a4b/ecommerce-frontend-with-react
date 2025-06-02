// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/cartContext.jsx';
import { MIXPANEL_PROJECT_TOKEN } from '../configs/constants.js';


//Import Mixpanel SDK
import mixpanel from "mixpanel-browser";


mixpanel.init(MIXPANEL_PROJECT_TOKEN, {
  autocapture: {
    pageview: "full-url",
    click: true,
    input: true,
    scroll: false,
    submit: true,
    capture_text_content: false,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
