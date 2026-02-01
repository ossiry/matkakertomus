// ASENNA ensin tarvittaessa
// npm install bootstrap react-bootstrap react-cookie react-router-dom react-toastify react-webpack toastify
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './resources/context/AuthContext'; // globaali muuttuja autentikointiin
import { BooleanProvider } from './resources/context/BooleanContext';
import { MatkakohdeProvider } from './resources/context/MatkakohdeContext';
import { BrowserRouter } from "react-router-dom";
import Matkakertomus from './Matkakertomus'; // entry point sovellukseen

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BooleanProvider>
        <MatkakohdeProvider>
          <BrowserRouter>
            <Matkakertomus />
          </BrowserRouter>
        </MatkakohdeProvider>
      </BooleanProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();