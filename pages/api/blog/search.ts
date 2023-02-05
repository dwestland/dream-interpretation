import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/common/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const blogs = await prisma.blogs.findMany({
      where: {
        body: {
          contains: req.body.search.term,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        title: true,
        body: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    res.status(200).json({ blogs })
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occurred.' })
  }
  return null
}
