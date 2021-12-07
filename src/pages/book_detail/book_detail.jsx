import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./book_detail.module.css";
import thumbnailImg from "../../common/images/thumbnail.png";

const BookDetail = (props) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [book, setBook] = useState(
    historyState === undefined ? JSON.parse(localStorage.getItem("book")) : historyState
  );

  const { title, thumbnail, contents, authors, publisher, translators } = book;

  const thumbnail_img = book.thumbnail.length > 0 ? book.thumbnail : thumbnailImg;
  const author = book.authors.join(", ");
  const translator = book.translators.join(", ");

  useEffect(() => {
    if (book.length) {
      localStorage.setItem("book", JSON.stringify(book));
    }
  }, [book]);

  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.line}></div>
      <div className={styles.detail}>
        <img className={styles.thumbnail} src={thumbnail_img} alt="thumbnail" />
        <div className={styles.info}>
          <ul className={styles.maker_list}>
            {author.length > 0 && (
              <li className={styles.author}>
                <h3 className={styles.author_title}>저자</h3>
                <p className={styles.author_name}>{author}</p>
              </li>
            )}
            {translator.length > 0 && (
              <li className={styles.author}>
                <h3 className={styles.author_title}>역자</h3>
                <p className={styles.author_name}>{translator}</p>
              </li>
            )}
            {publisher.length > 0 && (
              <li className={styles.author}>
                <h3 className={styles.author_title}>출판사</h3>
                <p className={styles.author_name}>{publisher}</p>
              </li>
            )}
          </ul>

          <h3 className={styles.content_title}>책 내용</h3>
          <p className={styles.content}>{contents}</p>
        </div>
      </div>
    </section>
  );
};

export default BookDetail;
