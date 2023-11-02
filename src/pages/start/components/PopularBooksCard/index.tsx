import Image from "next/image";

import { BookCard, BookCardInfo } from "./styles";
import { Star } from "phosphor-react";
import { BookData } from '@/pages/explorer/index.page';


interface PopularBookCardProps {
  book: BookData;
}

export default function PopularBookCard({ book }: PopularBookCardProps) {
  const ratingMap = [1, 2, 3, 4, 5];
  const bookImageUrl = `http://localhost:3000/${book.coverUrl}`;

  return (
    <BookCard>
      <Image src={bookImageUrl} alt="" width={100} height={100} />
      <BookCardInfo>
        <div>
          <span title={book.name}>{book.name}</span>
          <span>{book.author}</span>
        </div>
        <div>
          {ratingMap.map((value) => {
            if (book.rate >= value) {
              return <Star size={16} weight="fill" key={value} />;
            } else {
              return <Star size={16} weight="regular" key={value} />;
            }
          })}
        </div>
      </BookCardInfo>
    </BookCard>
  );
}
