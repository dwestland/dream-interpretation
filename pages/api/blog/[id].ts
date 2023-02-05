import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/common/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const blog = await prisma.blogs.findUnique({
      where: {
        id: +req.query.id,
      },
      select: {
        id: true,
        body: true,
        title: true,
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    res.status(200).json({ blog })
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occurred.' })
  }
  return null
}
