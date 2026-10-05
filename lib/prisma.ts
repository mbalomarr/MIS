import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to .env (see .env.example).");
  }
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

/*
 * One PrismaClient per server process. In development, Next.js hot reload
 * re-evaluates modules on every change; caching the client on globalThis
 * stops each reload from opening a new connection pool and exhausting
 * Supabase's connection limit.
 */
const globalForPrisma = globalThis as unknown as { prisma?: ReturnType<typeof createPrismaClient> };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
