import React from "react";
import { useState } from "react";

import "./BookForm.scss";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && author) {
      // данные отправить в STORE:
      const obj = {
        title: title,
        author: author,
      };
      console.log(obj); // {title: '127 hours', author: 'Rulston'}

      setTitle("");
      setAuthor("");
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>

      <form className="book-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input type="text" id="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default BookForm;
