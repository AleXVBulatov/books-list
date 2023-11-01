import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";

import { deleteBook, toggleFavourite } from "../../redux/books/actionCreators.js";
import { selectTitleFilter, selectAuthorFilter, selectOnlyFavouriteFilter } from "../../redux/slices/filterSlice.js";

import "./BookList.scss";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavouriteFilter = useSelector(selectOnlyFavouriteFilter);

  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id));
  };

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const filteredBooks = books.filter((book) => {
    const matchTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase());
    const matchFavourite = onlyFavouriteFilter ? book.isFavourite : true;

    return matchTitle && matchAuthor && matchFavourite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {filteredBooks.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, index) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++index}. {highlightMatch(book.title, titleFilter)} <em>by</em>{" "}
                  <strong>{highlightMatch(book.author, authorFilter)}</strong>
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
