// pages/[...slugs].ts
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { db } from "../db/db";

export const prerender = false;

async function getUsers() {
    const users = await db
      .selectFrom('users')
      .selectAll()
      .execute();
    return users;
  }
  
const app = new Elysia()
  .use(swagger())
    // CREATE: Add a user
    .post('/users', async ({ body, set }) => {
      const { name, email } = body as { name: string; email: string };
      const result = await db
        .insertInto('users')
        .values({ name, email })
        .execute();
      set.status = 201;
      return { message: 'User created', id: result[0].insertId };
    })
  .get('/users', async () => {
    const users = await getUsers();
    return users;
  })
   // READ: Get a user by ID
   .get('/users/:id', async ({ params }) => {
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', params.id)
      .executeTakeFirst();
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  })
    // UPDATE: Update a user by ID
    .put('/users/:id', async ({ params, body }) => {
      const { name, email } = body as { name: string; email: string };
      const result = await db
        .updateTable('users')
        .set({ name, email })
        .where('id', '=', params.id)
        .execute();
      if (result[0].numUpdatedRows === 0n) {
        return { error: 'User not found' };
      }
      return { message: 'User updated' };
    })
      // DELETE: Delete a user by ID
  .delete('/users/:id', async ({ params }) => {
    const result = await db
      .deleteFrom('users')
      .where('id', '=', params.id)
      .execute();
    if (result[0].numDeletedRows === 0n) {
      return { error: 'User not found' };
    }
    return { message: 'User deleted' };
  })


export type App = typeof app;

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;