import React from "react";
import BookCard from "../bookCard/bookCard";
import styles from "./bookList.module.css";

const BookList = ({ books, state, deleteBook, kakaoSearch }) => {
  return (
    <ul className={styles.container}>
      {books.map((book, i) => (
        <BookCard
          key={i}
          book={book}
          state={state}
          deleteBook={deleteBook}
          kakaoSearch={kakaoSearch}
        />
      ))}
    </ul>
  );
};

export default BookList;
