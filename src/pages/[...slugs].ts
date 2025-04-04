// pages/[...slugs].ts
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";
import { db } from "../db/db";

export const prerender = false;
// Types for our data models
const UserSchema = t.Object({
  id: t.Optional(t.Number()),
  username: t.String(),
  password: t.String(),
  email: t.String(),
});

const ItemSchema = t.Object({
  id: t.Optional(t.Number()),
  name: t.String(),
  description: t.Optional(t.String()),
  user_id: t.Optional(t.Number()),
  created_at: t.Optional(t.String()),
});

const LoginSchema = t.Object({
  username: t.String(),
  password: t.String(),
});

async function getUsers() {
  const users = await db.selectFrom("users").selectAll().execute();
  return users;
}

const app = new Elysia()
  .use(swagger())
  .use(
    jwt({
      name: "jwt",
      secret: import.meta.env.JWT_SECRET,
    })
  )
  // Define auth middleware
  .derive(({ jwt, request, set }) => {
    return {
      isAuthenticated: async () => {
        const cookie = request.headers.get("cookie") || "";
        const token = cookie
          .split("; ")
          .find((c) => c.startsWith("token="))
          ?.split("=")[1];
        const payload = await jwt.verify(token);

        if (!payload) {
          set.status = 401;
          return false;
        }

        return payload;
      },
    };
  })
  // Auth routes
  .group("/auth", (app) =>
    app
      .post(
        "/register",
        async ({ body, set }) => {
          const { username, password, email } = body as {
            username: string;
            password: string;
            email;
            string;
          };
          const result = await db
            .insertInto("users")
            .values({ username, password, email })
            .execute();
          set.status = 201;
          return { message: "User created", id: result[0].insertId };
        },
        {
          body: UserSchema,
          detail: {
            tags: ["Auth"],
            summary: "Register a new user",
            description: "Create a new user account",
          },
        }
      )
      .post(
        "/login",
        async ({ params, body, jwt, set }) => {
          const { username, password } = body as {
            username: string;
            password: string;
          };
          const user = await db
            .selectFrom("users")
            .selectAll()
            .where("username", "=", username)
            .where("password", "=", password)
            .executeTakeFirst();

          if (!user) {
            return {
              success: false,
              message: "Invalid credentials",
            };
          }

          const token = await jwt.sign({
            id: user.id!, // Add '!' to assert that 'user' is not null
            username: user.username!, // Add '!' to assert that 'user' is not null
          });

          // Set cookie
          set.headers[
            "Set-Cookie"
          ] = `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`;

          return {
            success: true,
            message: "Login successful",
          };
        },
        {
          body: LoginSchema,
          detail: {
            tags: ["Auth"],
            summary: "User login",
            description: "Authenticate a user and generate an access token",
          },
        }
      )
  )
  // CREATE: Add a user
  .post("/users", async ({ body, set }) => {
    const { username, email } = body as { username: string; email: string };
    const result = await db
      .insertInto("users")
      .values({ username, email })
      .execute();
    set.status = 201;
    return { message: "User created", id: result[0].insertId };
  })
  .get("/users", async ({ isAuthenticated }) => {
    const auth = await isAuthenticated();
    if (!auth) return { error: "Unauthorized" };

    const users = await getUsers();
    return users;
  })
  // READ: Get a user by ID
  .get("/users/:id", async ({ params }) => {
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", params.id)
      .executeTakeFirst();
    if (!user) {
      return { error: "User not found" };
    }
    return user;
  })
  // UPDATE: Update a user by ID
  .put("/users/:id", async ({ params, body }) => {
    const { username, email } = body as { username: string; email: string };
    const result = await db
      .updateTable("users")
      .set({ username, email })
      .where("id", "=", params.id)
      .execute();
    if (result[0].numUpdatedRows === 0n) {
      return { error: "User not found" };
    }
    return { message: "User updated" };
  })
  // DELETE: Delete a user by ID
  .delete("/users/:id", async ({ params }) => {
    const result = await db
      .deleteFrom("users")
      .where("id", "=", params.id)
      .execute();
    if (result[0].numDeletedRows === 0n) {
      return { error: "User not found" };
    }
    return { message: "User deleted" };
  });

export type App = typeof app;

const handle = ({ request }: { request: Request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
