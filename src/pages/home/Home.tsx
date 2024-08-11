import React, { useEffect, useState } from 'react';
import BookList from '../../components/bookList/BookList';
import BookSearch from '../../components/bookSearch/BookSearch';
import { fetchBooks, fetchBooksWithTitle } from '../../services/bookService/BookService';
import { Book } from '../../services/bookService/Types';
import MenuBar from '../../components/common/menuBar/MenuBar';

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch books data on component mount
    useEffect(() => {
        const loadBooks = async () => {
            try {
                const results = await fetchBooks('');
                setBooks(results);
            } catch (err) {
                setError('Failed to load books data');
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []); // Emptying the dependency array ensures this runs only on mount

    const handleSearch = async (query: string) => {
        const results = await fetchBooksWithTitle(query);
        setBooks(results);
    };

    if (loading) return (
        <div>
            <BookSearch onSearch={handleSearch} />
            <p>Loading...</p>
        </div>
    );
    if (error) return <p>{error}</p>;

    return (
        <div>
            <MenuBar />
            <BookSearch onSearch={handleSearch} />
            <BookList books={books} />
        </div>
    );
};

export default Home;
