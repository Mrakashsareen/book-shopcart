
# Book Shop Cart

A web application for managing a book shop's inventory, including adding, editing, and searching for books.
This is a role based application with following roles 
1. Normal User -> Home page as landing page
2. Admin  User -> Admin page as landing page 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/book-shopcart.git
    ```
2. Navigate to the project directory:
    ```sh
    cd book-shopcart
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
## E2E Testing

This project uses Playwright for end-to-end testing.

### Setup

1. Install Playwright:
    ```sh
    npx playwright install
    ```

### Running Tests

1. Run the E2E tests:
    ```sh
    npm run test:e2e
    ```

### Writing Tests

1. Create a new test file in the `tests` directory, for example, `tests/newTest.spec.js`.
2. Write your test using the Playwright API. Here is an example:
    ```javascript
    const { test, expect } = require('@playwright/test');

    test('basic test', async ({ page }) => {
      await page.goto('https://example.com');
      const title = await page.title();
      expect(title).toBe('Example Domain');
    });
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Components

## Common Components
### `MenuBar.tsx`

Handles the menu items and the header of the application

## Reuseable Components

### `Add Book`

Handles the addition of book


### `List Books`

Handles the list of books to be displayed to user

### `Card for Book`

Handles the display of a book and this is used in the list books component

### `Book Search`

Handles the search component of the book

## Pages

### `Home.tsx`

Handles the view and search based functions of the application, including searching, user login, creating cart.

### `Admin.tsx`

Handles the administrative functions of the application, including searching, adding, and editing books.

#### Functions

- `handleSearch(query: string)`: Searches for books with the given title.
- `handleAddBook()`: Opens the modal to add a new book.
- `handleEditBook(book: Book)`: Opens the modal to edit the selected book.
- `handleDeleteBook()`: Deletes the book.
- `handleSaveBook(newBook: Book)`: Saves the new or edited book.

### `AddBookModal.tsx`

A modal component for adding or editing a book.

#### Props

- `isOpen: boolean`: Determines if the modal is open.
- `onClose: () => void`: Function to close the modal.
- `onSave: (book: Book) => void`: Function to save the book.
- `book?: Book | null`: The book to be edited (if any).

#### State

- `title: string`: The title of the book.
- `author: string`: The author of the book.
- `genre: string`: The genre of the book.
- `price: number`: The price of the book.

## API

### `fetchBooks()`

Fetches all books from the data storage .

### `fetchBooksWithTitle(query: string)`

Fetches books with the given title.

### `updateBook(id: string, book: Book)`

Updates the book with the given ID.

### `addBook(book: Book)`

Adds a new book to the inventory.

### `deleteook(book: Book)`

delete a book from the inventory.


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

