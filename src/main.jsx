import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routers'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './provider/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
