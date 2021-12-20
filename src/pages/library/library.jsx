import React, { useEffect, useState } from "react";
import BookList from "../../components/common/bookList/bookList";
import styles from "./library.module.css";
const Library = ({ library, kakaoSearch }) => {
  const [books, setBooks] = useState([]);
  console.log("library");
  console.log(library);
  useEffect(() => {
    const getBooks = async () => {
      const response = await library.loadLibrary();
      console.log(response);
      const result = response.data;
      const arr = [];
      for (let i = 0; i < result.length; i++) {
        const res = await kakaoSearch.search(result[i].isbn, 1);
        arr.push(res.data.documents[0]);
      }
      setBooks(arr);
      console.log(arr);
    };
    getBooks();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>내서재</h1>
      </div>
      {books.length !== 0 ? (
        <BookList books={books} state="library" />
      ) : (
        <h1>내 서재 비어있음</h1>
      )}
    </div>
  );
};

export default Library;
