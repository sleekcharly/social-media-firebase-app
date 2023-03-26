import { Box, Flex } from '@chakra-ui/react';
import { useAuth } from 'hooks/auth';
import { LOGIN } from 'lib/routes';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

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
      <Flex pt="16" pb="12" mx="auto" w="full" maxW="1200">
        <Box w="900px">
          <Outlet />
        </Box>
        <Sidebar />
      </Flex>
    </>
  );
}
