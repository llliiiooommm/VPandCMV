import { useState } from 'react';
import { useBooks } from './hooks/useBooks';
import BookCard from './components/BookCard/BookCard';
import './App.css';

function App() {
  const { books, loading, error } = useBooks();
  const [search, setSearch] = useState('');

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loader">📚 Загрузка книг...</div>;
  if (error) return <div className="loader">❌ Ошибка: {error}</div>;

  return (
    <div className="app">
      <h1>📖 Моя библиотека</h1>
      
      <div className="search-panel">
        <input
          type="text"
          placeholder="🔍 Найти книгу..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="count">Найдено: {filtered.length}</span>
      </div>

      <div className="books-grid">
        {filtered.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            authors={book.authors}
            coverBlob={book.coverBlob}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
