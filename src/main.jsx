import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import router from './router';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';

// import './styles/home.css';
import './styles/page.css';

import "./i18n";

import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ToastProvider from './context/ToastContext/ToastProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ToastProvider>
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        </ToastProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);