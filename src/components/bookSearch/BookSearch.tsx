import React, { useState } from 'react';
import styles from './BookSearch.module.css';
interface Props {
  onSearch: (query: string) => void;
  isAdmin?: boolean;
  onAddBook?: () => void;
}

const BookSearch: React.FC<Props> = ({ onSearch, isAdmin, onAddBook }) => {
  const [searchItem, setSearchItem] = useState('');

  const handleSearch = () => {
    onSearch(searchItem);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchItem}
        className={styles.searchInput}
        placeholder="Search by title"
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <button onClick={handleSearch} className={styles.searchButton} >Search</button>
      {isAdmin && (<button onClick={onAddBook} className={styles.addButton}>
        Add Book
      </button>)}
    </div>
  );
};

export default BookSearch;
