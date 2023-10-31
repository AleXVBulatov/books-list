import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  onlyFavourite: false,
};

const filterSlice = createSlice({
  name: "filter", // название reducer;
  initialState: initialState, // начальное состояние
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    setOnlyFavouriteFilter: (state) => {
      state.onlyFavourite = !state.onlyFavourite;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { setTitleFilter, setAuthorFilter, setOnlyFavouriteFilter, resetFilters } = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectOnlyFavouriteFilter = (state) => state.filter.onlyFavourite;

export default filterSlice.reducer;
