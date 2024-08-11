import React from 'react';
import { Book } from '../../services/bookService/Types';
import BookCard from '../bookCard/BookCard';
import styles from './BookList.module.css'; 

interface Props {
  books: Book[];
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (book: Book) => void;
}

const BookList: React.FC<Props> = ({ books, isAdmin ,onDelete, onEdit}) => {
  return (
    <div className={styles.container}>
      {books.map(book => (
        <BookCard key={book.id} book={book} isAdmin={isAdmin} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default BookList;