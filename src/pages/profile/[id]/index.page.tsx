import { ChangeEvent, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";

import { getDistanceToNow } from "@/utils/getDistanceToNow";
import { prisma } from "@/lib/prisma";
import {
  BookOpen,
  BookmarkSimple,
  Books,
  MagnifyingGlass,
  Star,
  User,
  UserList,
} from "phosphor-react";

import {
  InputContainer,
  LeftSide,
  PageContainer,
  PageWrapper,
  TitleContainer,
  RightSide,
  UserProfileHeader,
  RatingContainer,
  RatingCard,
  RatingFeedContainer,
  RatingHeader,
  UserAnalyticsContainer,
  EmptyFeedContainer,
} from "./styles";

interface Rating {
  id: string;
  createdAt: string;
  description: string;
  rate: number;
  book: {
    id: string;
    author: string;
    coverUrl: string;
    name: string;
  };
}

interface ProfileUserData {
  name: string;
  createdAt?: string;
  image: string | null;
  ratings?: Rating[];
  analitycs: {
    totalPagesReaded: number;
    totalBooksRated: number;
    totalAuthorsReaded: number;
    mostReadedCategory: string;
  };
}

interface ProfileProps {
  profileData: ProfileUserData;
}

export default function Profile({ profileData }: ProfileProps) {
  const [searchInput, setSearchInput] = useState("");
  const ratingMap = [1, 2, 3, 4, 5];

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(value);
  };

  return (
    <PageContainer>
      <TitleContainer>
        <User size={32} />
        <h1>Perfil</h1>
      </TitleContainer>

      <PageWrapper>
        <LeftSide>
          <InputContainer>
            <input
              onChange={handleChange}
              value={searchInput}
              name="searchInput"
              type="text"
              placeholder="Buscar livro avaliado"
            />
            <MagnifyingGlass size={20} />
          </InputContainer>
          {profileData.ratings?.length ? (
            <RatingFeedContainer>
              {profileData.ratings
                ?.filter(({ book: { name } }) =>
                  name.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map((rating) => (
                  <RatingContainer key={rating.book.id} id={rating.id}>
                    <span>{getDistanceToNow(rating.createdAt)}</span>
                    <RatingCard>
                      <RatingHeader>
                        <Image
                          src={`http://localhost:3000/${rating.book.coverUrl}`}
                          alt=""
                          width={98}
                          height={134}
                        />
                        <div>
                          <div>
                            <span>{rating.book.name}</span>
                            <span>{rating.book.author}</span>
                          </div>
                          <div>
                            {ratingMap.map((value) => {
                              if (rating.rate >= value) {
                                return (
                                  <Star size={16} weight="fill" key={value} />
                                );
                              } else {
                                return (
                                  <Star
                                    size={16}
                                    weight="regular"
                                    key={value}
                                  />
                                );
                              }
                            })}
                          </div>
                        </div>
                      </RatingHeader>
                      <p>{rating.description}</p>
                    </RatingCard>
                  </RatingContainer>
                ))}
            </RatingFeedContainer>
          ) : (
            <EmptyFeedContainer>
              <span>Nenhuma avaliação encontrada</span>
              <Books size={64} />
            </EmptyFeedContainer>
          )}
        </LeftSide>

        <RightSide>
          <UserProfileHeader>
            <div>
              {/* <Image
                src={profileData.image ?? ""}
                alt=""
                width={72}
                height={72}
              /> */}
              {profileData.image ? (
                <Image src={profileData.image} alt="" width={40} height={40} />
              ) : (
                <User size={40} />
              )}
            </div>

            <div>
              <span>{profileData.name}</span>
              <span>membro desde 2019</span>
            </div>
          </UserProfileHeader>

          <hr />

          <UserAnalyticsContainer>
            <div>
              <BookOpen size={32} />

              <div>
                <span>{profileData.analitycs.totalPagesReaded}</span>
                <span>Páginas lidas</span>
              </div>
            </div>

            <div>
              <Books size={32} />

              <div>
                <span>{profileData.analitycs.totalBooksRated}</span>
                <span>Livros avaliados</span>
              </div>
            </div>

            <div>
              <UserList size={32} />

              <div>
                <span>{profileData.analitycs.totalAuthorsReaded}</span>
                <span>Autores lidos</span>
              </div>
            </div>

            <div>
              <BookmarkSimple size={32} />

              <div>
                <span>{profileData.analitycs.mostReadedCategory}</span>
                <span>Categoria mais lida</span>
              </div>
            </div>
          </UserAnalyticsContainer>
        </RightSide>
      </PageWrapper>
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    query: { id },
  } = ctx;

  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      created_at: true,
      avatar_url: true,
      ratings: {
        select: {
          id: true,
          created_at: true,
          description: true,
          rate: true,
          book: {
            select: {
              id: true,
              author: true,
              cover_url: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  const { created_at: createdAt, ratings, ...userData } = user;

  const orderedRatings: Rating[] = ratings
    .map(({ book, created_at: createdAt, ...rate }) => ({
      book: {
        coverUrl: book.cover_url,
        ...book,
      },
      createdAt: createdAt.toISOString(),
      ...rate,
    }))
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }

      return 0;
    });

  const analitycsData = await prisma.rating.findMany({
    where: { user_id: id },
    select: {
      id: true,
      book: {
        select: {
          total_pages: true,
          author: true,
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
      },
    },
  });

  const totalPagesReaded = analitycsData.reduce(
    (acc, { book: { total_pages: totalPages } }) => (acc += totalPages),
    0
  );

  const totalBooksRated = analitycsData.length;

  const authorConts: { [key: string]: number } = {};
  analitycsData.forEach(({ book: { author } }) => {
    if (authorConts[author] === undefined) {
      authorConts[author] = 1;
    } else {
      authorConts[author] += 1;
    }
  });

  const totalAuthorsReaded = analitycsData.filter(
    ({ book: { author } }) => authorConts[author] === 1
  ).length;

  const categoryCounts: { [key: string]: number } = {};

  analitycsData.forEach(({ book: { categories } }) => {
    categories.forEach(({ category: { name } }) => {
      if (categoryCounts[name] === undefined) {
        categoryCounts[name] = 1;
      } else {
        categoryCounts[name] += 1;
      }
    });
  });

  let mostReadedCategory = null;
  let maxCount = 0;

  for (const [category, count] of Object.entries(categoryCounts)) {
    if (count > maxCount) {
      mostReadedCategory = category;
      maxCount = count;
    }
  }

  const profileData = {
    ...userData,
    createdAt: createdAt.toISOString(),
    ratings: orderedRatings,
    analitycs: {
      totalPagesReaded,
      totalBooksRated,
      totalAuthorsReaded,
      mostReadedCategory,
    },
  };

  return {
    props: { profileData },
  };
};
