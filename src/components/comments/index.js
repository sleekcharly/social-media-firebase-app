import { Box } from '@chakra-ui/react';
import Post from 'components/post';
import { usePost } from 'hooks/posts';
import React from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import NewComment from './NewComment';

export default function Comments() {
  // get post id from url
  const { id } = useParams();

  //   get post information base on Id
  const { post, isLoading } = usePost(id);

  if (isLoading) return 'Loading Post...';

  return (
    <Box align="center" pt="50">
      <Post post={post} />

      <NewComment post={post} />

      <CommentList post={post} />
    </Box>
  );
}
