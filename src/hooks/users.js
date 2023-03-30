import { useToast } from '@chakra-ui/react';
import { doc, query, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from 'lib/firbase';
import { useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

// hook for getting user data
export function useUser(id) {
  // define query
  const q = query(doc(db, 'users', id));

  // destructure data using firbase hook
  const [user, isLoading] = useDocumentData(q);

  return { user, isLoading };
}

// hook for uploading images
export function useUpdateAvatar(uid) {
  // define loading and file states
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  //   use toast
  const toast = useToast();

  //   get navigation
  const navigate = useNavigate();

  // asynchronous function for uploading to firebase storage bucket
  async function updateAvatar() {
    // check if  file exists
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      return;
    }
    // set loading state
    setLoading(true);

    // get storage file reference
    const fileRef = ref(storage, 'avatars/' + uid);

    // firebase storage method
    await uploadBytes(fileRef, file);

    // get avatar url
    const avatarURL = await getDownloadURL(fileRef);

    // update User document
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, { avatar: avatarURL });

    // toast the user
    toast({
      title: 'Profile updated!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    });

    setLoading(false);

    navigate(0);
  }

  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
