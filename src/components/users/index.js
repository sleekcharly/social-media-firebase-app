import { SimpleGrid } from '@chakra-ui/react';
import { useUsers } from 'hooks/users';
import User from './User';

// component rsponsible for displaying all the app users
export default function Users() {
  // get users and loadingstate from custom hook
  const { users, isLoading } = useUsers();

  if (isLoading) return 'Loading...';

  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
      {users?.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
}
