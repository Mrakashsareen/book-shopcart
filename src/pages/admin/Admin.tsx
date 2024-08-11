import React, { useEffect, useState } from 'react';
import BookList from '../../components/bookList/BookList';
import BookSearch from '../../components/bookSearch/BookSearch';
import AddBookModal from '../../components/addBook/AddBookModal';
import { addBook, deleteBookById, fetchBooks, fetchBooksWithTitle, updateBook } from '../../services/bookService/BookService';
import { Book } from '../../services/bookService/Types';
import MenuBar from '../../components/common/menuBar/MenuBar';
import styles from './Admin.module.css';

const Admin: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [message, setMessage] = useState<string | null>(null); // For success or error messages
    const [isError, setIsError] = useState<boolean>(false); // To track if it's an error message


    // Fetch books data on component mount
    useEffect(() => {

        loadBooks();
    }, []); // Emptying the dependency array ensures this runs only on mount

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000); // 3 seconds

            return () => clearTimeout(timer); // Cleanup the timer on component unmount or when message changes
        }
    }, [message]);
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
    const handleSearch = async (query: string) => {
        const results = await fetchBooksWithTitle(query);
        setBooks(results);
    };

    const handleAddBook = () => {
        let newBook = {title:'',genre:'',author:'',price:0};
        setEditingBook(newBook); // Clear any existing editing state if any
        setIsModalOpen(true); // Open the modal
    };

    const handleEditBook = (book: Book) => {
        setEditingBook(book); // Set the book to be edited
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal window without saving
    };

    const handleSaveBook = async (newBook: Book) => {
        try {
            if (newBook.id) {
                // Edit book
                await updateBook(newBook.id, newBook);
                setMessage('Book updated successfully!');
                setIsError(false);
            } else {
                await addBook(newBook);
                setMessage('Book added successfully!');
                setIsError(false);
            }

            loadBooks();

        } catch (err) {
            setError('Failed to add new book');
        } finally {
            setLoading(false);
        }
        setIsModalOpen(false); // Close the modal after saving
    };

    const handleDeleteBook = async (id: number) => {
        try {
            await deleteBookById(id); // Assuming deleteBook API call is implemented
            loadBooks(); // Refresh the book list after deletion
            setMessage('Book deleted successfully!');
            setIsError(false);
        } catch (err) {
            setError('Failed to delete the book');
            setMessage('Failed to delete the book.');
            setIsError(true);
        }
    };

    const closeMessage = () => {
        setMessage(null);
    }

    if (loading) return (
        <div>
            <BookSearch onSearch={handleSearch} isAdmin={true} />
            <p>Loading...</p>
        </div>
    );
    if (error) return <p>{error}</p>;

    return (
        <div>
            <MenuBar />
            <BookSearch onSearch={handleSearch} isAdmin={true} onAddBook={handleAddBook} />
            {message && (<div className={isError ? styles.errorMessage : styles.successMessage} onClick={closeMessage}>
                {message}
            </div>)}
            <BookList books={books} isAdmin={true} onDelete={handleDeleteBook} onEdit={handleEditBook} />
            <AddBookModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveBook} book={editingBook} test-id="handleSaveBook"/>
        </div>
    );
};

export default Admin;
