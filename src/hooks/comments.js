import { useToast } from '@chakra-ui/react';
import { uuidv4 } from '@firebase/util';
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from 'lib/firbase';
import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// hook for adding comments
export function useAddComment({ postID, uid }) {
  // define loading state
  const [isLoading, setLoading] = useState(false);

  //   get toast function
  const toast = useToast();

  // asynchronous function for adding comment to firestore
  async function addComment(text) {
    // set loading state
    setLoading(true);

    // define comment ID
    const id = uuidv4();

    const date = Date.now();

    // define document ref
    const docRef = doc(db, 'comments', id);

    // set document
    await setDoc(docRef, { text, id, postID, date, uid });

    // send toast message
    toast({
      title: 'Comment added!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    });

    // change loading state
    setLoading(false);
  }

  return { addComment, isLoading };
}

//  hook for getting cpost comments
export function useComments(postID) {
  // define query
  const q = query(
    collection(db, 'comments'),
    where('postID', '==', postID),
    orderBy('date', 'asc'),
  );

  // get comments data
  const [comments, isLoading, error] = useCollectionData(q);

  console.log(comments);

  // throw error if error  exists
  if (error) throw error;

  return { comments, isLoading };
}

//  hook for deleting a comment
export function useDeleteComment(id) {
  // define loading state
  const [isLoading, setLoading] = useState(false);

  //   get toast
  const toast = useToast();

  // asynchronous function for deleting comment
  async function deleteComment() {
    const res = window.confirm('Are you sure you want to delete your comment?');

    // delete if response is true
    if (res) {
      setLoading(true);

      //  get document reference
      const docRef = doc(db, 'comments', id);

      // delete document
      await deleteDoc(docRef);

      // toast the user
      toast({
        title: 'Comment deleted!',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      setLoading(false);
    }
  }

  return { deleteComment, isLoading };
}
