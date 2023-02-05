import { PrismaClient } from '@prisma/client'
import users from '../seed-data/users'
import blogs from '../seed-data/blogs'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: users,
  })
  await prisma.blogs.createMany({
    data: blogs,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(0)
  })
  .finally(async () => prisma.$disconnect)
