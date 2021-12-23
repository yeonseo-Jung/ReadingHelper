import React from "react";
import BookCard from "../bookCard/bookCard";
import styles from "./bookList.module.css";

const BookList = ({ books, state, deleteBook }) => {
  return (
    <ul className={styles.container}>
      {books.map((book, i) => (
        <BookCard key={i} book={book} state={state} deleteBook={deleteBook} />
      ))}
    </ul>
  );
};

export default BookList;
