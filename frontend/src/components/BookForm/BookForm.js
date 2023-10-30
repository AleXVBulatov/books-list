// Использование хука useDispatch:
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addBook } from "../../redux/books/actionCreators.js";
import booksData from "../../data/books.json";

import "./BookForm.scss";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    const randomBook = booksData[randomIndex];

    const randomBookWithId = {
      ...randomBook,
      id: uuidv4(),
      isFavourite: false,
    };

    dispatch(addBook(randomBookWithId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title && author) {
      // данные отправить в STORE:
      const book = {
        title: title,
        author: author,
        id: uuidv4(),
        isFavourite: false,
      };

      // dispatch({ type: "ADD_BOOK", payload: {...book, id: uuidv4()} });
      dispatch(addBook(book));

      setTitle(""); // очистка инпута
      setAuthor(""); // очистка инпута
    }
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
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
      </form>
    </div>
  );
};

export default BookForm;

// Использование mapStateToProps, mapdispatchToProps:
// import React from "react";
// import { useState } from "react";
// import { connect } from "react-redux";
// import { v4 as uuidv4 } from "uuid";

// import { addBook } from "../../redux/books/actionCreators";

// import "./BookForm.scss";

// const BookForm = (props) => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (title && author) {
//       // данные отправить в STORE:
//       const book = {
//         title: title,
//         author: author,
//       };

//       props.addBookToProps(addBook({ ...book, id: uuidv4() }));

//       setTitle(""); // очистка инпута
//       setAuthor(""); // очистка инпута
//     }
//   };

//   return (
//     <div className="app-block book-form">
//       <h2>Add a New Book</h2>

//       <form className="book-form" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title: </label>
//           <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="author">Author: </label>
//           <input type="text" id="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
//         </div>
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

// const mapStateToProps = (state, ownProps) => {
//   console.log(state);
//   console.log(ownProps); // {}
//   return {
//     books: state.books,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addBookToProps: (value) => {
//       dispatch(value);
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
