import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { PROTECTED } from 'lib/routes';

export default function Avatar({ user, size = 'xl', overideAvatar = null }) {
  if (!user) return 'Loading...';

  return (
    <ChakraAvatar
      name={user.username}
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      size={size}
      src={overideAvatar || user.avatar}
      _hover={{ cursor: 'pointer', opacity: '0.8' }}
    />
  );
}
