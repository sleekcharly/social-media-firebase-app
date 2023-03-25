// This file is used to configure the list of all the different routed used in the application
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Layout from 'components/layout';
import { createBrowserRouter } from 'react-router-dom';

// difine the different paths
export const ROOT = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';

// define protected routes
export const PROTECTED = '/protected';
export const DASHBOARD = '/protected/dashboard';

// create the router
export const router = createBrowserRouter([
  { path: ROOT, element: 'Public root' },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [{ path: DASHBOARD, element: 'Dashboard' }],
  },
]);
