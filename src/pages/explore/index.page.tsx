import { GetServerSideProps } from "next";
import { useState } from "react";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Binoculars, MagnifyingGlass, Star } from "phosphor-react";
import {
  BookCard,
  BookCardInfo,
  BookListContainer,
  CategoryButton,
  CategoryContainer,
  InputContainer,
  PageContainer,
  PageHeader,
} from "./styles";
import BookDialog from "@/components/BookDialog";
import { useSession } from "next-auth/react";

export interface BookData {
  id: string;
  coverUrl: string;
  name: string;
  author: string;
  rate: number;
  totalPages: number;
  ratings: {
    id: string;
    rate: number;
    description: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  categories: string[];
}

interface ExploreProps {
  books: BookData[];
  categories: {
    id: string;
    name: string;
  }[];
}

export default function Explore({ books, categories }: ExploreProps) {
  const [searchBookValue, setSearchBookValue] = useState("");
  const [categoryFilterValue, setCategoryFilterValue] = useState("all");
  const { data: session } = useSession();

  const ratingMap = [1, 2, 3, 4, 5];

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <Binoculars size={32} />
          <h1>Explorar</h1>
        </div>
        <InputContainer>
          <input
            onChange={(e) => setSearchBookValue(e.target.value)}
            value={searchBookValue}
            name="searchInput"
            type="text"
            placeholder="Buscar livro avaliado"
          />
          <MagnifyingGlass size={20} />
        </InputContainer>
      </PageHeader>
      <CategoryContainer>
        <CategoryButton
          onClick={() => setCategoryFilterValue("all")}
          selected={categoryFilterValue === "all" && true}
        >
          Tudo
        </CategoryButton>
        {categories.map(({ name, id }) => (
          <CategoryButton
            onClick={() => setCategoryFilterValue(name)}
            selected={categoryFilterValue === name && true}
            key={id}
          >
            {name}
          </CategoryButton>
        ))}
      </CategoryContainer>
      <BookListContainer>
        {books
          .filter(
            ({ categories }) =>
              categories.includes(categoryFilterValue) ||
              categoryFilterValue === "all"
          )
          .filter(({ name }) =>
            name.toLowerCase().includes(searchBookValue.toLowerCase())
          )
          .map((book) => (
            <RadixDialog.Root key={book.id}>
              <RadixDialog.Trigger asChild>
                <BookCard
                  readed={book.ratings.some(
                    (rating) => rating.user.id === session?.user.id
                  )}
                >
                  <Image
                    src={`http://localhost:3000/${book.coverUrl}`}
                    alt=""
                    width={108}
                    height={152}
                  />
                  <BookCardInfo>
                    <div>
                      <span title={book.name}>{book.name}</span>
                      <span>{book.author}</span>
                    </div>
                    <div>
                      {ratingMap.map((value) => {
                        if (book.rate >= value) {
                          return <Star key={value} size={16} weight="fill" />;
                        } else {
                          return (
                            <Star key={value} size={16} weight="regular" />
                          );
                        }
                      })}
                    </div>
                  </BookCardInfo>
                </BookCard>
              </RadixDialog.Trigger>
              <BookDialog book={book} />
            </RadixDialog.Root>
          ))}
      </BookListContainer>
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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

  const booksData = books
    .map(
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
    )
    .sort((a, b) => b.rate - a.rate);

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return {
    props: {
      books: booksData,
      categories,
    },
  };
};
