import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import createBookWithId from "../../utils/createBookWithId.js";
import { setError } from "./errorSlice";

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk("books/fetchBook", async (url, thunkAPI) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    thunkAPI.dispatch(setError(error.message));
    return thunkAPI.rejectWithValue(error);
  }
});

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return { ...state, books: state.books.filter((book) => book.id !== action.payload) };
    },
    toggleFavourite: (state, action) => {
      state.books.forEach((book) => (book.id === action.payload ? (book.isFavourite = !book.isFavourite) : book));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state, action) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithId(action.payload, "api"));
      }
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.isLoadingViaAPI = false;
    });
  },
});

export const { addBook, deleteBook, toggleFavourite } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default booksSlice.reducer;
