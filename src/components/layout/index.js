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
  console.log(user);

  // re-render component if pathName changes
  useEffect(() => {
    // navigate to login page if pathname starts with protected and the user is not logged in.
    if (pathname.startsWith('/protected') && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user]);

  // return loading text if isLoading is true
  if (isLoading) return 'Loading...';

  return (
    <>
      <Outlet />
    </>
  );
}
