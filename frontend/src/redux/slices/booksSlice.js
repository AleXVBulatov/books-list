import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import createBookWithId from "../../utils/createBookWithId";

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

export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (!res.data && !res.data.title && !res.data.author) return;
    dispatch(addBook(createBookWithId(res.data, "api")));
  } catch (err) {
    console.log("Error fetching random book", err);
  }
};

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
