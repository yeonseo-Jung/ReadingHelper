import React, { useEffect, useState } from "react";
import BookList from "../../components/common/bookList/bookList";
import styles from "./library.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setPageFrom, setPageNow } from "../../actions/page";

const Library = ({ library, kakaoSearch }) => {
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBooks = async () => {
      const response = await library.loadLibrary();
      console.log(response);
      const result = response.data;
      console.log(result);
      setBooks(result);
    };
    getBooks();
  }, []);

  const deleteBook = async (id) => {
    console.log(typeof id);
    await library.deleteBook(id);
    const response = await library.loadLibrary();
    console.log(response);
    const result = response.data;
    console.log(result);
    setBooks(result);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>내서재</h1>
      {books.length !== 0 ? (
        <BookList
          books={books}
          state={"library"}
          deleteBook={deleteBook}
          kakaoSearch={kakaoSearch}
        />
      ) : (
        <h1 className={styles.empty}>내 서재 비어있음</h1>
      )}
    </div>
  );
};

export default Library;
