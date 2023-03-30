import { Button } from '@chakra-ui/react';
import { PROTECTED } from 'lib/routes';
import React from 'react';
import { Link } from 'react-router-dom';

export default function UsernameButton({ user }) {
  return (
    <Button
      colorScheme="teal"
      variant="link"
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
    >
      {user.username}
    </Button>
  );
}
