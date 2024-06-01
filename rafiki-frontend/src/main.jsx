import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/index.css";
import UserRegistration from './pages/Register';
import LandingPage from './pages/Landing';
import Dashboard from './pages/Dashboard';
import TenantDashboard from './pages/TenantDash';
import UserLogin from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/register",
    element: <UserRegistration/>,
  },
  {
    path: "/login",
    element: <UserLogin/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/tenant",
    element: <TenantDashboard />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
