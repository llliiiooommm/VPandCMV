import { useEffect, useState } from 'react';
import './BookCard.css';

interface BookCardProps {
  title: string;
  authors: string[];
  coverBlob: Blob | null;
}

const BookCard = ({ title, authors, coverBlob }: BookCardProps) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    if (coverBlob) {
      const url = URL.createObjectURL(coverBlob);
      setCoverUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [coverBlob]);

  return (
    <div className="book-card">
      <div className="book-cover">
        {coverUrl ? (
          <img src={coverUrl} alt={title} />
        ) : (
          <div className="no-cover">📖</div>
        )}
      </div>
      <h3 className="book-title">{title}</h3>
      <p className="book-authors">{authors.join(', ')}</p>
    </div>
  );
};

export default BookCard;