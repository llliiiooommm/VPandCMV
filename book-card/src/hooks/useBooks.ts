import { useState, useEffect } from 'react';
import type { Book } from '../types/book';
import { fetchBooks } from '../api/openLibraryApi';
import { fetchCover } from '../api/openLibraryCoverApi';

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
            try {
              let coverBlob: Blob | null = null;
              if (book.coverId) {
                coverBlob = await fetchCover(book.coverId);
              }
              return { ...book, coverBlob };
            } catch (err) {
              console.warn(`Не удалось загрузить обложку для ${book.title}:`, err);
              return { ...book, coverBlob: null };
            }
          })
        );
        
        setBooks(withCovers);
        setError(null);
      } catch (err) {
        console.error('Ошибка загрузки книг:', err);
        setError('Не удалось загрузить книги. Проверьте соединение.');
      } finally {
        setLoading(false);
      }
    };
    
    load();
  }, []);

  return { books, loading, error };
};