import React from 'react';
import './index.css';
import App from './App';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';



render((
    <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
            <App />
        </SnackbarProvider>
    </BrowserRouter>
), document.getElementById('root'));