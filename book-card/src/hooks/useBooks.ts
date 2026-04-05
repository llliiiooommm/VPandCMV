import { useState, useEffect } from 'react';
import type { Book } from '../types/book';
import { fetchBooks } from '../api/openLibraryApi';
import { fetchCover } from '../api/openLibraryCoverApi';
import { fetchGoogleCover } from '../api/googleBooksApi';

interface BookWithCover extends Book {
  coverBlob: Blob | null;
}

export const useBooks = () => {
  const [books, setBooks] = useState<BookWithCover[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const booksData = await fetchBooks();
        
        const withCovers = await Promise.all(
          booksData.map(async (book) => {
            let coverBlob: Blob | null = null;
            if (book.coverId) coverBlob = await fetchCover(book.coverId);
            if (!coverBlob && book.isbn) coverBlob = await fetchGoogleCover(book.isbn);
            return { ...book, coverBlob };
          })
        );
        
        setBooks(withCovers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };
    
    load();
  }, []);

  return { books, loading, error };
};