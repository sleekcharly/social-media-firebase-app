import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useAuth } from 'hooks/auth';
import { useUpdateAvatar } from 'hooks/users';
import React from 'react';
import Avatar from './Avatar';

export default function EditProfile({ isOpen, onClose }) {
  // get authenticated user
  const { user, isLoading: userLoading } = useAuth();

  //   get file upload function from custom hook
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.id);

  // function for handling imge upload
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  if (userLoading) return 'Loading ...';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton avatar />
        <ModalBody>
          <HStack spacing="5">
            <Avatar user={user} overideAvatar={fileURL} />
            <FormControl py="4">
              <FormLabel htmlFOr="picture">Change avatar</FormLabel>
              <input type="file" accept="image/*" onChange={handleChange} />
            </FormControl>
          </HStack>

          <Button
            loadingText="Uploading"
            w="full"
            my="6"
            colorScheme="teal"
            onClick={updateAvatar}
            isLoading={fileLoading}
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
