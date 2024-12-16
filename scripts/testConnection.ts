const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('success: db connected');
  } catch (error) {
    console.error('Failed to connect to MySQL database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
