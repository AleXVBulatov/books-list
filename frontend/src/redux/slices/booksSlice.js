import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavourite: (state, action) => {
      state.forEach((book) => (book.id === action.payload ? (book.isFavourite = !book.isFavourite) : book));
    },
  },
});

export const { addBook, deleteBook, toggleFavourite } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
