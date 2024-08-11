import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookSearch from './BookSearch';

describe('BookSearch Component', () => {
  test('renders search input and button', () => {
    render(<BookSearch onSearch={jest.fn()} />);
    
    expect(screen.getByPlaceholderText('Search by title')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('calls onSearch with the correct query', () => {
    const mockOnSearch = jest.fn();
    render(<BookSearch onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search by title');
    const searchButton = screen.getByText('Search');
    
    fireEvent.change(searchInput, { target: { value: 'Test Book' } });
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Test Book');
  });

  test('renders Add Book button when isAdmin is true', () => {
    const mockOnAddBook = jest.fn();
    render(<BookSearch onSearch={jest.fn()} isAdmin={true} onAddBook={mockOnAddBook} />);
    
    expect(screen.getByText('Add Book')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Add Book'));
    expect(mockOnAddBook).toHaveBeenCalled();
  });

  test('does not render Add Book button when isAdmin is false', () => {
    render(<BookSearch onSearch={jest.fn()} isAdmin={false} />);
    
    expect(screen.queryByText('Add Book')).not.toBeInTheDocument();
  });
});