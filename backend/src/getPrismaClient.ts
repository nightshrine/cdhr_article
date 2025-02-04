const { PrismaClient } = await import('@prisma/client');
const { PrismaD1 } = await import('@prisma/adapter-d1');

export const getPrismaClient = async (db: D1Database) => {
    const adapter = new PrismaD1(db);
    return new PrismaClient({ adapter });
};
