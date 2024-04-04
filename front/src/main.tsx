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
import CreateClient from './routes/MainMenuOutlet/CreateClient/index.tsx';

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
        children: [
          {
            index: true,
            element: <Client />,
          },
          {
            path: 'criar',
            element: <CreateClient />,
          },
        ],
      },
      {
        path: '/funcionario',
        children: [
          {
            index: true,
            element: <Employee />,
          },
        ],
      },
      {
        path: '/produto',
        children: [
          {
            index: true,
            element: <Product />,
          },
        ],
      },
      {
        path: '/relatorio',
        children: [
          {
            index: true,
            element: <Report />,
          },
        ],
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
