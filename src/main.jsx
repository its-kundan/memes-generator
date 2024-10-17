import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { reportWebVitals } from 'next/dist/build/templates/pages.';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Browser
    <App />
  </StrictMode>,
)
