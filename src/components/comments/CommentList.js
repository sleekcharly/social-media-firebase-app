import { Box } from '@chakra-ui/react';
import { useComments } from 'hooks/comments';
import React from 'react';
import Comment from './Comment';

export default function CommentList({ post }) {
  // get post Id from props
  const { id } = post;

  // get comments from custom hook
  const { comments, isLoading } = useComments(id);

  if (isLoading) return 'Loading...';

  return (
    <Box>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Box>
  );
}
