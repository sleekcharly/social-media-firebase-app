import { Box, Button, Heading, HStack, Textarea } from '@chakra-ui/react';
import PostsList from 'components/post/PostsList';
import { useAuth } from 'hooks/auth';
import { useAddPost, usePosts } from 'hooks/posts';
import React from 'react';
import { useForm } from 'react-hook-form';
import reactTextareaAutosize from 'react-textarea-autosize';

// New post function component
function NewPost() {
  // implement react hook form functionality
  const { register, handleSubmit, reset } = useForm();

  // get add post items
  const { addPost, isLoading: addingPost } = useAddPost();

  //   get the current user object
  const { user, isLoading: authLoading } = useAuth();

  // function for handling post submission
  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    });
    reset();
  }

  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between">
          <Heading size="lg">New Post</Heading>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={authLoading || addingPost}
            loadingText="Loading"
          >
            Post
          </Button>
        </HStack>

        <Textarea
          as={reactTextareaAutosize}
          resize="none"
          mt="5"
          placeholder="Create a new post..."
          minRows={3}
          {...register('text', { required: true })}
        />
      </form>
    </Box>
  );
}

export default function Dashboard() {
  // get the  posts parameters from usePosts
  const { posts, isLoading } = usePosts();

  if (isLoading) return 'Loading posts...';

  return (
    <>
      <NewPost />
      <PostsList posts={posts} />
    </>
  );
}
