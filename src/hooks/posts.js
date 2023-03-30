// hook responsible for adding post to firebase firestore
import { useToast } from '@chakra-ui/react';
import { uuidv4 } from '@firebase/util';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from 'lib/firbase';
import { useState } from 'react';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';

// hook for adding new post to firebase firestore.
export function useAddPost() {
  // set loading state
  const [isLoading, setLoading] = useState(false);

  //   get toast
  const toast = useToast();

  // asynchronous function for adding post
  async function addPost(post) {
    setLoading(true);

    // set custom id for post
    const id = uuidv4();

    // use setDoc to add post to firebase firestore
    await setDoc(doc(db, 'posts', id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });

    // send a toast success message
    toast({
      title: 'Post added successfully',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    });

    setLoading(false);
  }

  return { addPost, isLoading };
}

// hook for retrieving posts
export function usePosts(uid = null) {
  // define query
  const q = uid
    ? query(
        collection(db, 'posts'),
        where('uid', '==', uid),
        orderBy('date', 'desc'),
      )
    : query(collection(db, 'posts'), orderBy('date', 'desc'));

  // destructure data from query using firebase hook
  const [posts, isLoading, error] = useCollectionData(q);

  // throw error to console if errors exist
  if (error) throw error;

  return { posts, isLoading };
}

// hook for managing liking of posts
export function useToggleLike({ id, isLiked, uid }) {
  // define loading state
  const [isLoading, setLoading] = useState(false);

  // define asynchronous function for liking and unliking posts
  async function toggleLike() {
    setLoading(true);

    // get document reference
    const docRef = doc(db, 'posts', id);

    // update the posts document based on like or unlike
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });

    setLoading(false);
  }

  return { toggleLike, isLoading };
}

// hook for deleting a post
export function useDeletePost(id) {
  //  set loading state
  const [isLoading, setLoading] = useState(false);

  // asynchronous function for deleting a post from firebase firestore
  async function deletePost() {}

  return { deletePost, isLoading };
}

// hook for getting a single post information
export function usePost(id) {
  // define query
  const q = doc(db, 'posts', id);

  // get data from collection
  const [post, isLoading] = useDocumentData(q);

  return { post, isLoading };
}
