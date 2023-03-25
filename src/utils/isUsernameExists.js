// checking to see if the username already exist in the database

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'lib/firbase';

export default async function isUsernameExists(username) {
  const q = query(collection(db, 'users'), where('username', '==', username));
  const querySnapshot = await getDocs(q);

  // return true or false if user name exists.
  return querySnapshot.size > 0;
}
