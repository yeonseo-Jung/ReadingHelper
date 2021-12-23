import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import BookList from "../../components/common/bookList/bookList";
import styles from "./report.module.css";
const Report = ({ library, kakaoSearch }) => {
  const [books, setBooks] = useState([]);
  const history = useHistory();
  const location = useLocation();

  const deleteBook = (isbn) => {};
  const goToWrite = () => {
    history.push({
      pathname: "/report/write",
    });
  };
  console.log(location.state);
  useEffect(() => {
    console.log(location.state);
    setBooks(location.state.report);
  }, [location.state]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>독후감</h1>
      {books.length !== 0 ? (
        <BookList books={books} state="library" deleteBook={deleteBook} />
      ) : (
        <h1 className={styles.empty}>독후감이 없습니다.</h1>
      )}
      <button onClick={goToWrite}>추가하기</button>
    </div>
  );
};

export default Report;
