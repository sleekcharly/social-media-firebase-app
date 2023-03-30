import { Flex, IconButton } from '@chakra-ui/react';
import { useAuth } from 'hooks/auth';
import { useComments } from 'hooks/comments';
import { useDeletePost, useToggleLike } from 'hooks/posts';
import { PROTECTED } from 'lib/routes';
import React from 'react';
import {
  FaComment,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaTrash,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Actions({ post }) {
  // destructure the post information
  const { id, likes, uid } = post;

  //   get the user object to determine if the post was liked by the logged in user
  const { user, isLoading: userLoading } = useAuth();

  //   boolean to determine if a  post is liked
  const isLiked = likes.includes(user?.id);

  //   get toggle like function from custom useToggleLike hook
  const { toggleLike, isLoading: likeLoading } = useToggleLike({
    id,
    isLiked,
    uid: user?.id,
  });

  //   get deletePost action from custome hook
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);

  //   get comment info from custom hook
  const { comments, isLoading: commentsLoading } = useComments(id);

  return (
    <Flex p="2">
      {/* like button */}
      <Flex alignItems="center">
        <IconButton
          onClick={toggleLike}
          isLoading={likeLoading || userLoading}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={isLiked ? <FaHeart /> : <FaRegHeart />}
          isRound
        />
        {likes.length}
      </Flex>

      {/* comments button */}
      <Flex alignItems="center" ml="2">
        <IconButton
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          //   isLoading={likeLoading || userLoading}
          size="md"
          colorScheme="teal"
          variant="ghost"
          icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
          isRound
        />
        {comments?.length}
      </Flex>

      {!userLoading && user.id === uid && (
        <IconButton
          ml="auto"
          onClick={deletePost}
          isLoading={deleteLoading}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={<FaTrash />}
          isRound
        />
      )}
    </Flex>
  );
}
