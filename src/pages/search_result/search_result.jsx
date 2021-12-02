import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BookCard from "../../components/book_card/book_card";
import styles from "./search_result.module.css";

const SearchResult = ({ query, books }) => {
  return (
    <>
      <h3>{`\'${query}\' 검색 결과`}</h3>
      <ul className={styles.books}>
        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </ul>
    </>
  );
};

export default SearchResult;
