import React, { useEffect, useState } from 'react';
import { Book } from '../../services/bookService/Types';
import styles from './AddBookModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
  book?: Book | null; 
}

const AddBookModal: React.FC<Props> = ({ isOpen, onClose, onSave, book }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState({
    title: '',
    author: '',
    genre: '',
    price: ''
  });
  const [initialBook, setInitialBook] = useState<Book | null>(null);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setPrice(book.price);
      setErrors({
        title: '',
        author: '',
        genre: '',
        price: ''
      });
      setInitialBook(book);
    }
  }, [book]);

  const handleSave = () => {
    const newErrors = {
        title: !title ? 'Title is required.' : '',
        author: !author ? 'Author is required.' : '',
        genre: !genre ? 'Genre is required.' : '',
        price: price <= 0 ? 'Price must be greater than 0.' : ''
      };
      if (newErrors.title || newErrors.author || newErrors.genre || newErrors.price) {
        setErrors(newErrors);
        return;
      }
    const newBook: Book = {
      id: book ? book.id : undefined,
      title,
      author,
      genre,
      price
    };
    onSave(newBook);
  };
  const handleClose = () => {
    onClose();
    resetPage();
    };

    const resetPage = () => {
        setTitle(initialBook?.title ?? '');
        setAuthor(initialBook?.author ?? '');   
        setGenre(initialBook?.genre ?? '');
        setPrice(initialBook?.price ?? 0);
        setErrors({
            title: '',
            author: '',
            genre: '',
            price: ''
          });
    };

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{book?.id ? 'Edit Book' : 'Add a New Book'}</h2>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          required
          className={styles.inputField}
        />
        <div className={styles.error}>{errors.title}</div>
        <label>Author: </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author Name"
          required
          className={styles.inputField}
        />
        <div className={styles.error}>{errors.author}</div>
        <label>Genre: </label>
         <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          required
          className={styles.inputField}
        />
        <div className={styles.error}>{errors.genre}</div>
        <label>Price: </label>
         <input
          type="number"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          placeholder="Price"
          required
          className={styles.inputField}
        />
        <div className={styles.error}>{errors.price}</div>
        <div className={styles.buttonGroup}>
          <button onClick={handleSave} className={styles.saveButton}>Save</button>
          <button onClick={handleClose} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
