import { useToast } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'lib/firbase';
import { DASHBOARD } from 'lib/routes';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

// useAuth hook
export function useAuth() {
  // destructure parameters required to manage authentication firebase auth sdk
  const [authUser, isLoading, error] = useAuthState(auth);

  return { user: authUser, isLoading, error };
}

// useLogin hook
export function useLogin() {
  // define loading state
  const [isLoading, setLoading] = useState(false);

  //   get toast from chakra-ui
  const toast = useToast();

  //   navigation
  const navigate = useNavigate();

  // asynchronous login function
  async function login({ email, password, redirectTo = DASHBOARD }) {
    setLoading(true);

    try {
      // sign in using firebase email and password authentication
      await signInWithEmailAndPassword(auth, email, password);
      //   success message if successful
      toast({
        title: 'You are logged in',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      //   navigate to dashboard
      navigate(redirectTo);
    } catch (error) {
      // error message for failure
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      setLoading(false);
      return false; // Return false if login failed
    }

    setLoading(false);
    return true; //Return true if login succeded
  }

  return { login, isLoading };
}
