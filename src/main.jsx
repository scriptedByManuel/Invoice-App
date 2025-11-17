import { createRoot } from 'react-dom/client'
import './styles/global.css'
import 'flowbite';
import { RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import router from './routes/Router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
 </StrictMode>
)
