// This file is used to configure the list of all the different routed used in the application
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Comments from 'components/comments';
import Dashboard from 'components/dashboard';
import Layout from 'components/layout';
import Profile from 'components/profile';
import { createBrowserRouter } from 'react-router-dom';

// difine the different paths
export const ROOT = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';

// define protected routes
export const PROTECTED = '/protected';
export const DASHBOARD = '/protected/dashboard';
export const USERS = '/protected/users';
export const PROFILE = '/protected/profile/:id';
export const COMMENTS = '/protected/comments/:id';

// create the router
export const router = createBrowserRouter([
  { path: ROOT, element: 'Public root' },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      { path: DASHBOARD, element: <Dashboard /> },
      { path: USERS, element: 'users' },
      { path: PROFILE, element: <Profile /> },
      { path: COMMENTS, element: <Comments /> },
    ],
  },
]);
