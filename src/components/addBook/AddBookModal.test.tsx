import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBookModal from './AddBookModal';
import { Book } from '../../services/bookService/Types';

describe('AddBookModal', () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();

  const renderComponent = (isOpen: boolean, book?: Book | null) => {
    render(
      <AddBookModal
        isOpen={isOpen}
        onClose={mockOnClose}
        onSave={mockOnSave}
        book={book}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when open', () => {
    act(() => {
      renderComponent(true);
    });
    expect(screen.getByText('Add a New Book')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    act(() => {
      renderComponent(false);
    });
    expect(screen.queryByText('Add a New Book')).not.toBeInTheDocument();
  });

  test('displays error messages when fields are empty', () => {
    act(() => {
      renderComponent(true);
    });

    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Author is required.')).toBeInTheDocument();
    expect(screen.getByText('Genre is required.')).toBeInTheDocument();
    expect(screen.getByText('Price must be greater than 0.')).toBeInTheDocument();
  });

  test('calls onSave with correct data when fields are filled', () => {
    act(() => {
      renderComponent(true);
    });

    fireEvent.change(screen.getByPlaceholderText('Book Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Author Name'), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByPlaceholderText('Genre'), { target: { value: 'Test Genre' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '10' } });

    fireEvent.click(screen.getByText('Save'));

    expect(mockOnSave).toHaveBeenCalledWith({
      id: undefined,
      title: 'Test Title',
      author: 'Test Author',
      genre: 'Test Genre',
      price: 10
    });
  });

  test('calls onClose when cancel button is clicked', () => {
    act(() => {
      renderComponent(true);
    });

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('pre-fills fields when editing a book', () => {
    const book: Book = {
      id: 1,
      title: 'Existing Title',
      author: 'Existing Author',
      genre: 'Existing Genre',
      price: 20
    };

    act(() => {
      renderComponent(true, book);
    });

    expect(screen.getByPlaceholderText('Book Title')).toHaveValue('Existing Title');
    expect(screen.getByPlaceholderText('Author Name')).toHaveValue('Existing Author');
    expect(screen.getByPlaceholderText('Genre')).toHaveValue('Existing Genre');
    expect(screen.getByPlaceholderText('Price')).toHaveValue(20);
  });
});