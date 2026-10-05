// Requires: prisma, dotenv (both devDependencies)
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // The CLI (db push, migrate) needs a session-mode connection; the app itself
    // uses the pooled DATABASE_URL at runtime (see lib/prisma.ts).
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
