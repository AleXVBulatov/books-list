import * as actionTypes from "./actionTypes.js";

const initialState = [];

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return [...state, action.payload];
    case actionTypes.DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    case actionTypes.TOGGLE_FAVOURITE:
      return state.map((book) => (book.id === action.payload ? { ...book, isFavourite: !book.isFavourite } : book));
    default:
      return state;
  }
};

export default booksReducer;
