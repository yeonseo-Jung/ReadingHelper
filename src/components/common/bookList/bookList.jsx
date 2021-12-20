import React from "react";
import BookCard from "../bookCard/bookCard";
import styles from "./bookList.module.css";

const BookList = ({ books, state }) => {
  return (
    <ul className={styles.books}>
      {books.map((book) => (
        <BookCard key={book.isbn} book={book} state={state} />
      ))}
    </ul>
  );
};

export default BookList;
