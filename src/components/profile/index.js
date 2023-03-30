import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import PostsList from 'components/post/PostsList';
import { format } from 'date-fns';
import { useAuth } from 'hooks/auth';
import { usePosts } from 'hooks/posts';
import { useUser } from 'hooks/users';
import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import EditProfile from './EditProfile';

export default function Profile() {
  // get the user id from the url
  const { id } = useParams();

  //   get user posts
  const { posts, isLoading: postLoading } = usePosts(id);

  //   get user credentials
  const { user, isLoading: userLoading } = useUser(id);

  //   get authenticated user
  const { user: authUser, isLoading: authLoading } = useAuth();

  //   get modal methods
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (userLoading) return 'Loading...';

  return (
    <Stack spacing="5">
      <Flex p={['4', '6']} pos="relative" align="center">
        <Avatar user={user} size="2xl" />

        {!authLoading && authUser.id === user.id && (
          <Button
            pos="absolute"
            mb="2"
            top="6"
            right="6"
            colorScheme="teal"
            onClick={onOpen}
          >
            Change avatar
          </Button>
        )}
        <Stack ml="10">
          <Text fontSize="2xl">{user.username}</Text>
          <HStack spacing="10">
            <Text color="gray.700" fontSize={['sm', 'lg']}>
              Posts: {posts.length}
            </Text>
            <Text color="gray.700" fontSize={['sm', 'lg']}>
              Likes: todo!
            </Text>
            <Text color="gray.700" fontSize={['sm', 'lg']}>
              Joined: {format(user.datE, 'MMMM YYY')}
            </Text>
          </HStack>
        </Stack>

        <EditProfile isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Divider />

      {postLoading ? (
        <Text>Posts are Loading...</Text>
      ) : (
        <PostsList posts={posts} />
      )}
    </Stack>
  );
}
