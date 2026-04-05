import axios from 'axios';
import type { Book } from '../types/book';

const API_URL = 'https://openlibrary.org/search.json?q=subject:fiction&limit=12';

interface OpenLibraryDoc {
  title: string;
  author_name?: string[];
  isbn?: string[];
  cover_i?: number;
}

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await axios.get(API_URL);
  const docs = response.data.docs as OpenLibraryDoc[];
  
  return docs.map((doc, index) => ({
    id: index + 1,
    title: doc.title || 'Без названия',
    isbn: doc.isbn?.[0] || `978${Math.random().toString().slice(2, 12)}`,
    pageCount: 250,
    authors: doc.author_name || ['Неизвестный автор'],
    coverId: doc.cover_i
  }));
};