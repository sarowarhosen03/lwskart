const { PrismaClient } = require('@prisma/client')

const prismaClientSingleton = () => {
  return new PrismaClient();
}

if (!global.prismaGlobal) {
  global.prismaGlobal = prismaClientSingleton()
}

const prisma = global.prismaGlobal

module.exports = prisma

if (process.env.NODE_ENV !== 'production') global.prismaGlobal = prisma