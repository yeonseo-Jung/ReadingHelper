import React from "react";
import { useHistory } from "react-router";
import styles from "./book_detail.module.css";

const BookDetail = (props) => {
  const history = useHistory();
  const historyState = history?.location?.book;
  const { title, thumbnail, contents, authors } = historyState;
  console.log(historyState);
  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.detail}>
        <img className={styles.thumbnail} src={thumbnail} alt="thumbnail" />
        <div className={styles.info}>
          <ul className={styles.authors}>
            <li>저자</li>
            <li>역자</li>
            <li>출판사</li>
          </ul>
          <h3>책 내용</h3>
          <p>{contents}</p>
        </div>
      </div>
    </section>
  );
};

export default BookDetail;
