import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";

import { deleteBook, toggleFavourite } from "../../redux/books/actionCreators.js";

import "./BookList.scss";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id));
  };

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, index) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++index}. {book.title} by <strong>{book.author}</strong>
                </div>
                <div className="book-actions">
                  <span onClick={() => handleToggleFavourite(book.id)}>
                    {book.isFavourite ? <BsBookmarkStarFill className="star-icon" /> : <BsBookmarkStar className="star-icon" />}
                  </span>

                  <button onClick={() => handleDeleteBook(book.id)}>DELETE</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;
