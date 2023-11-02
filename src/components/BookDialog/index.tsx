import Image from "next/image";
import { useState } from "react";

import * as RadixDialog from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, BookmarkSimple, Check, Star, User, X } from "phosphor-react";

import {
  BookInfoContainer,
  BulletInfoContainer,
  ButtonsFormContainer,
  CloseButton,
  ContentContainer,
  HeaderContainer,
  Overlay,
  RateCardContainer,
  RateFormContainer,
  RateHeader,
  RatingsContainer,
  UserContainer,
  ValueRatingContainer,
} from "./styles";
import LoginDialog from "../LoginDialog";
import { BookData } from '@/pages/explore/index.page';
import { getDistanceToNow } from "@/utils/getDistanceToNow";
import { api } from "@/lib/axios";

interface BookDialogProps {
  book: BookData;
}

const handleRateFormSchema = z.object({
  description: z.string(),
});

type handleRateFormData = z.infer<typeof handleRateFormSchema>;

export default function BookDialog({ book }: BookDialogProps) {
  const [ratingList, setRatingList] = useState(book.ratings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRate, setSelectedRate] = useState(0);
  const [errorText, setErrorText] = useState("");

  const { register, handleSubmit, reset } = useForm<handleRateFormData>({
    resolver: zodResolver(handleRateFormSchema),
  });

  const { status, data: session } = useSession();

  const ratingMap = [1, 2, 3, 4, 5];

  const closeForm = () => {
    setIsFormOpen(false);
    setErrorText("");
    setSelectedRate(0);
    reset();
  };

  const onClose = (e: Event) => {
    e.preventDefault();
    closeForm();
  };

  const handleRate = async (data: handleRateFormData) => {
    if (!data.description) {
      setErrorText("O texto da avaliação não pode estar vazio");
      return;
    }
    if (!selectedRate) {
      setErrorText("A nota não pode ser 0");
      return;
    }

    if (session) {
      const requestPayload = {
        ...data,
        rate: selectedRate,
        bookId: book.id,
        userId: session.user.id,
      };

      const response = await api.post("/createRating", requestPayload);
      setRatingList((lastValue) => [response.data, ...lastValue]);
      book.ratings.push(response.data);
    }
  };

  return (
    <RadixDialog.Portal>
      <Overlay />

      <ContentContainer onCloseAutoFocus={onClose}>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <HeaderContainer>
          <div>
            <Image
              src={`http://localhost:3000/${book.coverUrl}`}
              alt=""
              width={171}
              height={242}
            />
            <BookInfoContainer>
              <div>
                <span>{book.name}</span>
                <span>{book.author}</span>
              </div>

              <div>
                <div>
                  {ratingMap.map((value) => {
                    if (value <= book.rate) {
                      return <Star key={value} weight="fill" size={20} />;
                    } else {
                      return <Star key={value} size={20} />;
                    }
                  })}
                </div>

                <span>{book.ratings.length} avaliações</span>
              </div>
            </BookInfoContainer>
          </div>

          <BulletInfoContainer>
            <div>
              <BookmarkSimple size={24} />
              <div>
                <span>Categoria</span>

                <span>
                  {book.categories
                    .map((category, i) =>
                      i === 0 ? category : category.toLowerCase()
                    )
                    .join(", ")}
                </span>
              </div>
            </div>

            <div>
              <BookOpen size={24} />

              <div>
                <span>Páginas</span>
                <span>{book.totalPages}</span>
              </div>
            </div>
          </BulletInfoContainer>
        </HeaderContainer>

        <RatingsContainer>
          {status === "authenticated" ? (
            <div>
              <span>Avaliações</span>

              {isFormOpen ? (
                <></>
              ) : (
                <button type="button" onClick={() => setIsFormOpen(true)}>
                  Avaliar
                </button>
              )}
            </div>
          ) : (
            <div>
              <span>Avaliações</span>

              <RadixDialog.Root>
                <RadixDialog.Trigger asChild>
                  <button type="button">Avaliar</button>
                </RadixDialog.Trigger>

                <LoginDialog />
              </RadixDialog.Root>
            </div>
          )}

          {isFormOpen && (
            <RateFormContainer onSubmit={handleSubmit(handleRate)}>
              <ValueRatingContainer>
                <div>
                  <div>
                    {session?.user.image 
                      ? <Image src={session?.user.image} alt="" width={40} height={40}
                    /> 
                      : <User size={40}/>
                    }
                  </div>

                  <span>{session?.user.name}</span>
                </div>

                <div>
                  {ratingMap.map((value) => (
                    <Star
                      key={value}
                      size={24}
                      onMouseEnter={() => setHoveredStar(value)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setSelectedRate(value)}
                      weight={
                        value <= hoveredStar || value <= selectedRate
                          ? "fill"
                          : "regular"
                      }
                    />
                  ))}
                </div>
              </ValueRatingContainer>
              <span>{errorText}</span>

              <div>
                <textarea
                  placeholder="Escreva sua avaliação"
                  {...register("description")}
                />
                <span>0/450</span>
              </div>

              <ButtonsFormContainer>
                <button type="button" onClick={closeForm}>
                  <X size={24} />
                </button>

                <button type="submit">
                  <Check size={24} />
                </button>
              </ButtonsFormContainer>
            </RateFormContainer>
          )}

          {ratingList.map((rating) => (
            <RateCardContainer
              ownRate={rating.user.id === session?.user.id}
              key={rating.id}
            >
              <RateHeader>
                <UserContainer>
                  <div>
                    <Image
                      src={rating.user.image}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>

                  <div>
                    <span>{rating.user.name}</span>
                    <span>{getDistanceToNow(rating.createdAt)}</span>
                  </div>
                </UserContainer>

                <div>
                  {ratingMap.map((value) => {
                    if (value <= rating.rate) {
                      return <Star key={value} weight="fill" size={16} />;
                    } else {
                      return <Star key={value} size={16} />;
                    }
                  })}
                </div>
              </RateHeader>

              <span>{rating.description}</span>
            </RateCardContainer>
          ))}
        </RatingsContainer>
      </ContentContainer>
    </RadixDialog.Portal>
  );
}
