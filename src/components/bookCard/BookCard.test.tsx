import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookCard from './BookCard';
import { Book } from '../../services/bookService/Types';

const mockBook: Book = {
  id: 1,
  title: 'Test Book',
  author: 'Test Author',
  genre: 'Test Genre',
  price: 10000,
};

describe('BookCard Component', () => {
  test('renders book details correctly', () => {
    render(<BookCard book={mockBook} />);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author: Test Author')).toBeInTheDocument();
    expect(screen.getByText('Genre: Test Genre')).toBeInTheDocument();
    expect(screen.getByText(10000)).toBeInTheDocument();
  });

  test('renders admin buttons when isAdmin is true', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(<BookCard book={mockBook} isAdmin={true} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockBook);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockBook.id);
  });

  test('renders buy button when isAdmin is false', () => {
    render(<BookCard book={mockBook} isAdmin={false} />);
    
    expect(screen.getByText('Buy')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Buy'));
    expect(screen.getByText('Buy')).toBeInTheDocument(); // Just to ensure the button is clickable
  });
});