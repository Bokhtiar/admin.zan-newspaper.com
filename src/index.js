import './index.css';
import {App} from './App'
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {  ThemeProvider } from './components/ThemeContext';
import "./App.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
