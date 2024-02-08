import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

/**
 * note in next js every time save the file the hot reload will be triggered (see the changed in browser )
 * and this will create a bunch of new prisma client instance
 * so if we not in production we store it in globalThis (globalThis will not be effected by hot reload)
 */

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;