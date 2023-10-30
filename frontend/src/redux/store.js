import { configureStore } from "@reduxjs/toolkit";

import booksReducer from "./books/bookReducer.js";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
