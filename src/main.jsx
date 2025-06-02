// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/cartContext.jsx';


//Import Mixpanel SDK
import mixpanel from "mixpanel-browser";
 

mixpanel.init('085582d6b61b8771260f330722a6ed10', {
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
