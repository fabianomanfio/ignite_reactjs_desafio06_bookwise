// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// /api/book?bookId=48b86ac2-014e-401d-bcbb-331ce5f4a457

import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const bookId = String(req.query.bookId)

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  })

  return res.json({ book })
}
