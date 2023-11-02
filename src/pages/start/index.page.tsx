import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { CaretRight, ChartLineUp, Star } from "phosphor-react";
import * as RadixDialog from "@radix-ui/react-dialog";

import BookDialog from "@/components/BookDialog";
import { BookData } from '../explorer/index.page';
import { getDistanceToNow } from "@/utils/getDistanceToNow";
import ActivityStartCard from "./components/ActivityStartCard";
import PopularBookCard from "./components/PopularBooksCard";
import { prisma } from "../../lib/prisma";
import {
  LastActivityContainer,
  LastActivityContent,
  LeftSide,
  PageContainer,
  PageWrapper,
  RigthSide,
  TitleContainer,
} from "./styles";

export type Activity = {
  id: string;
  description: string;
  rate: number;
  createdAt: string;
  user: {
    image?: string;
    name: string;
    id: string;
  };
  book: {
    coverUrl: string;
    name: string;
    author: string;
  };
};

type LoggedUserLastRating = {
  id: string;
  description: string;
  rate: number;
  createdAt: string;
  book: {
    name: string;
    author: string;
    coverUrl: string;
  };
};

interface StartProps {
  activities: Activity[];
  popularBooks: BookData[];
  loggedUserLastRating: LoggedUserLastRating | null;
}

export default function Start({
  activities,
  popularBooks,
  loggedUserLastRating,
}: StartProps) {
  const activityList = activities.map((activity) => {
    const { createdAt, ...activityKeys } = activity;

    return {
      createdAt: getDistanceToNow(createdAt),
      ...activityKeys,
    };
  });

  const ratingMap = [1, 2, 3, 4, 5];

  return (
    <PageContainer>
      <TitleContainer>
        <ChartLineUp size={32} weight="regular" />
        <h1>Início</h1>
      </TitleContainer>

      <PageWrapper>
        <LeftSide>
          {loggedUserLastRating && (
            <>
              <div>
                <span>Sua última leitura</span>
                <Link href={`/profile/${loggedUserLastRating.id}`}>
                  Ver todas
                  <CaretRight size={16} />
                </Link>
              </div>
              <LastActivityContainer>
                <img
                  src={`http://localhost:3000/${loggedUserLastRating.book.coverUrl}`}
                  // src={`${process.env.BASE_URL}${loggedUserLastRating.book.coverUrl}`}
                  alt=""
                  width={108}
                  height={152}
                />
                <LastActivityContent>
                  <div>
                    <span>
                      {getDistanceToNow(loggedUserLastRating.createdAt)}
                    </span>
                    <div>
                      {ratingMap.map((value) => {
                        if (loggedUserLastRating.rate >= value) {
                          return <Star size={16} weight="fill" key={value} />;
                        } else {
                          return (
                            <Star size={16} weight="regular" key={value} />
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div>
                    <span>{loggedUserLastRating.book.name}</span>
                    <span>{loggedUserLastRating.book.author}</span>
                  </div>
                  <span>{loggedUserLastRating.description}</span>
                </LastActivityContent>
              </LastActivityContainer>
            </>
          )}
          <span>Avaliações mais recentes</span>
          {activityList.map((activity) => (
            <ActivityStartCard key={activity.id} activity={activity} />
          ))}
        </LeftSide>

        <RigthSide>
          <div>
            <span>Livros populares</span>
            <Link href="/explore">
              <span>Ver todos</span>
              <CaretRight size={16} weight="regular" />
            </Link>
          </div>
          <div>
            {popularBooks.map((book) => (
              <RadixDialog.Root key={book.id}>
                <PopularBookCard book={book} />

                <BookDialog book={book} />
              </RadixDialog.Root>
            ))}
          </div>
        </RigthSide>
      </PageWrapper>
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const ratings = await prisma.rating.findMany({
    select: {
      id: true,
      description: true,
      rate: true,
      created_at: true,
      user: {
        select: {
          avatar_url: true,
          name: true,
          id: true,
        },
      },
      book: {
        select: {
          name: true,
          author: true,
          cover_url: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
  });

  const activities = ratings.map(
    ({ created_at: createdAt, book, description, ...rating }) => {
      const descriptionWords = description.split(" ");

      return {
        book: {
          coverUrl: book.cover_url,
          ...book,
        },
        createdAt: createdAt.toISOString(),
        description:
          descriptionWords.length > 40
            ? descriptionWords.slice(0, 40).join(" ") + "..."
            : description,
        ...rating,
      };
    }
  );

  const books = await prisma.book.findMany({
    select: {
      id: true,
      cover_url: true,
      name: true,
      author: true,
      total_pages: true,
      ratings: {
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
        orderBy: { created_at: "desc" },
      },
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const popularBooks = books.map(
    ({
      cover_url: coverUrl,
      total_pages: totalPages,
      categories,
      ratings,
      ...book
    }) => ({
      coverUrl,
      totalPages,
      categories: categories.map(({ category }) => category.name),
      rate:
        ratings.reduce((acc, { rate }) => (acc += rate), 0) / ratings.length,
      ratings: ratings.map(({ created_at: createdAt, ...data }) => ({
        createdAt: createdAt.toISOString(),
        ...data,
      })),
      ...book,
    })
  );

  let loggedUserLastRating: LoggedUserLastRating | null;

  if (session && session.user && session.user.email) {
    const loggedUserRatings = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        ratings: {
          select: {
            description: true,
            rate: true,
            created_at: true,
            book: {
              select: {
                name: true,
                author: true,
                cover_url: true,
              },
            },
          },
          orderBy: { created_at: "desc" },
        },
      },
    });

    if (loggedUserRatings?.ratings[0]) {
      const lastRating = loggedUserRatings?.ratings[0];
      const { created_at: createdAt, book, ...rest } = lastRating;

      loggedUserLastRating = {
        id: loggedUserRatings.id,
        createdAt: createdAt.toISOString(),
        book: {
          coverUrl: book.cover_url,
          ...book,
        },
        ...rest,
      };
    } else {
      loggedUserLastRating = null;
    }
  } else {
    loggedUserLastRating = null;
  }

  return {
    props: {
      activities,
      popularBooks: popularBooks.sort((a, b) => b.rate - a.rate).slice(0, 4),
      loggedUserLastRating,
    },
  };
};
