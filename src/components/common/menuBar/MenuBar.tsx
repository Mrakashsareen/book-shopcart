import React from 'react';
import styles from './MenuBar.module.css';

const MenuBar: React.FC = () => {
  return (
    <nav className={styles.menuBar}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <a href="/" className={styles.menuLink}>Home</a>
        </li>
        <li className={styles.menuItem}>
          <a href="/admin" className={styles.menuLink}>Admin</a>
        </li>
        <li className={styles.menuItem}>
          <a href="/register" className={styles.menuLink}>New User</a>
        </li>
        <li className={styles.menuItem}>
          <a href="/login" className={styles.menuLink}>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
