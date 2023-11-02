import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";

import { addBook, fetchBook } from "../../redux/slices/booksSlice.js";
import { setError } from "../../redux/slices/errorSlice.js";

import createBookWithId from "../../utils/createBookWithId.js";
import booksData from "../../data/books.json";

import "./BookForm.scss";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    const randomBookWithId = createBookWithId(randomBook, "random");

    dispatch(addBook(randomBookWithId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && author) {
      const book = createBookWithId({ title: title, author: author }, "manual");

      dispatch(addBook(book));

      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("You must fill title and author"));
    }
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddRandomBookViaAPI = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>

      <form className="book-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" value={title} onChange={(event) => handleChange(event)} />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input type="text" id="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random Book
        </button>

        <button type="button" onClick={handleAddRandomBookViaAPI} disabled={isLoading}>
          {isLoading ? (
            <>
              <span>Loading book</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
