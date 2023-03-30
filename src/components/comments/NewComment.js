import { Box, Button, Flex, Input } from '@chakra-ui/react';
import Avatar from 'components/profile/Avatar';
import { useAuth } from 'hooks/auth';
import { useAddComment } from 'hooks/comments';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function NewComment({ post }) {
  // get authenticated user
  const { user, isLoading } = useAuth();

  //    get form functions
  const { register, handleSubmit, reset } = useForm();

  // get post Id
  const { id: postID } = post;

  //   get comment function from custom hook
  const { addComment, isLoading: AddingComment } = useAddComment({
    postID,
    uid: user?.id,
  });

  //   function for adding comment
  function handleAddComment(data) {
    // add comment
    addComment(data.text);

    reset();
  }

  if (isLoading) return 'Loading...';

  return (
    <Box maxW="600px" mx="auto" py="6">
      <Flex padding="4">
        <Avatar user={user} size="sm" />
        <Box flex="1" ml="4">
          <form onSubmit={handleSubmit(handleAddComment)}>
            <Box>
              <Input
                size="sm"
                variant="flushed"
                placeholder="Write comment..."
                autoComplete="off"
                {...register('text', { required: true })}
              />
            </Box>

            <Flex pt="2">
              <Button
                type="submit"
                colorScheme="teal"
                size="xs"
                ml="auto"
                isLoading={AddingComment || isLoading}
              >
                Add Comment
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
