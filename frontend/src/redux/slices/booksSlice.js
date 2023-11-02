import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import createBookWithId from "../../utils/createBookWithId.js";
import { setError } from "./errorSlice";

const initialState = [];

export const fetchBook = createAsyncThunk("books/fetchBook", async (url, thunkAPI) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    thunkAPI.dispatch(setError(error.message));
    throw error; // чтобы сработало событие rejected, а началось выполнение fulfilled из extraReducers
  }
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithId(action.payload, "api"));
      }
    });
  },
});

export const { addBook, deleteBook, toggleFavourite } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
