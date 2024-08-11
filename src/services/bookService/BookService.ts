import axios from 'axios';
import { Book } from './Types';

const API_URL = '/api/books';

export const fetchBooks = async (query: string): Promise<Book[]> => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};
export const fetchBooksWithTitle = async (query: string): Promise<Book[]> => {
  const response = await axios.get(`${API_URL}/search?title=${query}`);
  return response.data;
};
export const addBook = async (query: Book): Promise<Book[]> => {
  const response = await axios.post(`${API_URL}`,query);
  return response.data;
};
export const updateBook = async (bookId: number,query: Book): Promise<Book[]> => {
  const response = await axios.put(`${API_URL}/${bookId}`,query);
  return response.data;
};

export const deleteBookById = async (bookId: number): Promise<Book[]> => {
  const response = await axios.delete(`${API_URL}/${bookId}`);
  return response.data;
};