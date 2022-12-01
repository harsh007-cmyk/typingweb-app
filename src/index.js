import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TestModeContextprovider } from './Context/TestMode';
import { ThemeContextProvider } from './Context/ThemeContext';
import {BrowserRouter} from 'react-router-dom';
import { AlertContextProvider } from './Context/AlertContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    
    <ThemeContextProvider>
    <AlertContextProvider>
      <TestModeContextprovider>
        <BrowserRouter>
         <App />
         </BrowserRouter>
      </TestModeContextprovider>
      </AlertContextProvider>
      </ThemeContextProvider>
      
  </React.StrictMode>
);



