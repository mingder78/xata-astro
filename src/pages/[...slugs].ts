// pages/[...slugs].ts
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { db } from "../db/db";

export const prerender = false;

async function getUsers() {
    const users = await db
      .selectFrom('users')
      .select(['id', 'username'])
      .execute();
  
    console.log(users);
    return users;
  }
  
const app = new Elysia()
  .use(swagger())
  .get('/users', async () => {
    const users = await getUsers();
    return users;
  })

export type App = typeof app;

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
export const PATCH = handle;