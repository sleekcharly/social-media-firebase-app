import { Button, Code, Link, VStack } from '@chakra-ui/react';
import Avatar from 'components/profile/Avatar';
import { PROTECTED } from 'lib/routes';
import { Link as NavLink } from 'react-router-dom';

// component responsible for rendering a user
export default function User({ user }) {
  // get user data
  const { id, username } = user;

  return (
    <VStack
      bg="gray.100"
      shadow="sm"
      rounded="md"
      textAlign="center"
      p="4"
      spacing="3"
    >
      <Avatar user={user} />
      <Code>@{username}</Code>
      <Link>
        <Button
          as={NavLink}
          to={`${PROTECTED}/profile/${id}`}
          size="sm"
          variant="link"
          colorScheme="teal"
        >
          View Profile
        </Button>
      </Link>
    </VStack>
  );
}
