import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Actions from './Actions';
import Header from './Header';

export default function Post({ post }) {
  // destructure post info
  const { text } = post;

  return (
    <Box p="2" maxW="600px" textAlign="left">
      <Box border="2px solid" borderColor="gray.100" borderRadius="md">
        <Header post={post} />

        <Box p="2" minH="100px">
          <Text wordBreak="break-word" fontSize="md">
            {text}
          </Text>
        </Box>

        <Actions post={post} />
      </Box>
    </Box>
  );
}
