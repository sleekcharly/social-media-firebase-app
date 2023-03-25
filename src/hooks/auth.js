import { useToast } from '@chakra-ui/react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from 'lib/firbase';
import { DASHBOARD, LOGIN } from 'lib/routes';
import { useEffect, useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import isUsernameExists from 'utils/isUsernameExists';

// useAuth hook
export function useAuth() {
  // destructure parameters required to manage authentication firebase auth sdk
  const [authUser, authLoading, error] = useAuthState(auth);
  //   set loading state for user state
  const [isLoading, setLoading] = useState(true);
  // set user state
  const [user, setUser] = useState(null);

  // get user data from firestore when authLoading state changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, 'users', authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading]);

  return { user, isLoading, error };
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

// useRegister hook
export function useRegister() {
  // set loading state
  const [isLoading, setLoading] = useState(false);

  //   get toast from chakra-ui
  const toast = useToast();

  //   set navigation
  const navigate = useNavigate();

  // asynchronous register function
  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);

    // checking if username already exists before registering
    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      toast({
        title: 'Username already exists',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      setLoading(false);
    } else {
      try {
        // res contains the newly created user data
        const res = await createUserWithEmailAndPassword(auth, email, password);

        // set user information in firestore
        await setDoc(doc(db, 'users', res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: '',
          datE: Date.now(),
        });

        // set toast for successful registration
        toast({
          title: 'Account created',
          description: 'You are logged in',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 5000,
        });

        // navigate the user
        navigate(redirectTo);
      } catch (error) {
        toast({
          title: 'Signing up failed',
          description: error.message,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }

    setLoading(false);
  }

  return { register, isLoading };
}

// logout hook
export function useLogout() {
  // get parameters from react-firebase-hook
  const [signOut, isLoading, error] = useSignOut(auth);
  // get toast from chakra
  const toast = useToast();
  // get navigation uitlity
  const navigate = useNavigate();

  // asynchronous function for logging out user
  async function logout() {
    // returns a boolean promise
    if (await signOut()) {
      toast({
        title: 'Successfully logged out',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      navigate(LOGIN);
    } // else: show error [sognOut returns false if failed]
  }

  return { logout, isLoading };
}
