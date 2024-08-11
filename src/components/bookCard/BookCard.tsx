import React from 'react';
import { Book } from '../../services/bookService/Types';
import styles from './BookCard.module.css'; 
interface Props {
  book: Book;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (book: Book) => void;
}

const BookCard: React.FC<Props> = ({ book,isAdmin, onDelete, onEdit  }) => {
  return (
    <div className={styles.card}>
    <h3 className={styles.title}>{book.title}</h3>
    <p className={styles.content}>Author: {book.author}</p>
    <p className={styles.content}>Genre: {book.genre}</p>
    <p className={styles.content}>{book.price}</p>
    {isAdmin && (
      <div className={styles.buttonGroup}>
        <button onClick={() => onEdit?.(book)} className={styles.editButton}>Edit</button>
        <button onClick={() => onDelete?.(book.id??0)} className={styles.deleteButton}>Delete</button>
      </div>
    )}
     {!isAdmin && (
      <div className={styles.buttonGroup}>
        <button onClick={() => alert('development in progress')}  className={styles.buyButton}>Buy</button>
      </div>
    )}
  </div>
  );
};

export default BookCard;