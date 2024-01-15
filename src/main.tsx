import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './routes/Login/index.tsx';
import Error from './routes/Error/index.tsx';
import AuthContextProvider from './context/AuthContext.tsx';
import Cashier from './routes/MainMenuOutlet/Cashier';
import Client from './routes/MainMenuOutlet/Client';
import Employee from './routes/MainMenuOutlet/Employee';
import Product from './routes/MainMenuOutlet/Product';
import Report from './routes/MainMenuOutlet/Report';

const browserRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Navigate to="/caixa" />,
      },
      {
        path: '/caixa',
        element: <Cashier />,
      },
      {
        path: '/cliente',
        element: <Client />,
      },
      {
        path: '/funcionario',
        element: <Employee />,
      },
      {
        path: '/produto',
        element: <Product />,
      },
      {
        path: '/relatorio',
        element: <Report />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <RouterProvider router={browserRouter} />
  </AuthContextProvider>
  // </React.StrictMode>,
)
