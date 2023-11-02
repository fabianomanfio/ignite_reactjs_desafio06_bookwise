import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

interface CreateRatingNextApiRequest extends NextApiRequest {
  body: {
    description: string;
    rate: number;
    bookId: string;
    userId: string;
  };
}

const RequestPayloadSchema = z.object({
  description: z.string().min(1),
  rate: z.number().min(1),
  bookId: z.string(),
  userId: z.string(),
});

export default async function handler(
  req: CreateRatingNextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  const payloadValidation = RequestPayloadSchema.safeParse(body);

  if (!payloadValidation.success) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  const book = await prisma.book.findUnique({
    where: { id: body.bookId },
  });

  if (!book) {
    return res.status(404).json({ message: "Livro não encontrado" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: body.userId,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  const { userId, bookId, ...payload } = body;

  const newRating = await prisma.rating.create({
    data: { ...payload, user_id: userId, book_id: bookId },
    select: {
      id: true,
      rate: true,
      description: true,
      created_at: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar_url: true,
        },
      },
    },
  });

  const { created_at: createdAt, ...rating } = newRating;

  const formatedRating = {
    createdAt: createdAt.toISOString(),
    ...rating,
  };

  return res.status(201).json(formatedRating);
}
