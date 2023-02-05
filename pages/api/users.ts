import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/common/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
        },
      })
      res.status(200).json({ users })
    } catch (err) {
      console.log(err)
      res.status(403).json({ err: 'Error occurred.' })
    }

    return null
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
