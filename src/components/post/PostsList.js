import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Post from '.';

export default function PostsList({ posts }) {
  return (
    <Box px="4" align="center">
      {posts?.length === 0 ? (
        <Text textAlign="center" fontSize="xl">
          No posts yet... feeling a little lonely here.
        </Text>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}
