import { db } from './db/db'; // Import the Kysely instance

// Fetch all users
async function getUsers() {
  const users = await db
    .selectFrom('users')
    .select(['id', 'username'])
    .execute();

  console.log(users);
  return users;
}

getUsers();