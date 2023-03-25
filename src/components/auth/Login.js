import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { useLogin } from 'hooks/auth';
import { DASHBOARD, REGISTER } from 'lib/routes';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { emailValidate, passwordValidate } from 'utils/form-validate';

export default function Login() {
  // destructure login and loading parameters from custom useLogin hook
  const { login, isLoading } = useLogin();

  //handling form input state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // define handleLogin function
  async function handleLogin(data) {
    // the data object comes from information extracted from the handleSubmit function of the useForm hook.
    const succeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });

    // resets the form clearing the form's input fields
    succeded && reset();
  }

  return (
    // Center creates a centered div
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
        <Heading mb="4" size="lg" textAlign="center">
          Log In
        </Heading>

        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl isInvalid={errors.email} py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register('email', emailValidate)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register('password', passwordValidate)}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="teal"
            size="md"
            w="full"
            isLoading={isLoading}
            loadingText="Logging In"
          >
            Log In
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="6">
          Don't have an account?{' '}
          <Link
            to={REGISTER}
            as={RouterLink}
            color="teal.800"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ background: 'teal.100' }}
          >
            Register
          </Link>{' '}
          instead!
        </Text>
      </Box>
    </Center>
  );
}
