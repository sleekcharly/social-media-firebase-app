import Navbar from 'components/navbar';
import { useAuth } from 'hooks/auth';
import { LOGIN } from 'lib/routes';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// The Layout component controls the rendering of the potected routes children
export default function Layout() {
  // get the pathname of the current page
  const { pathname } = useLocation();

  //   get navigate from the useNavigate hoot to run page navigation
  const navigate = useNavigate();

  //   get user state and isLoading state from custom useAuth hook
  const { user, isLoading } = useAuth();

  // re-render component if pathName changes
  useEffect(() => {
    // navigate to login page if user is not loading,  pathname starts with protected and the user is not logged in.
    if (!isLoading && pathname.startsWith('/protected') && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading]);

  // return loading text if isLoading is true
  if (isLoading) return 'Loading...';

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
