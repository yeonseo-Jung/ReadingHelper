import React from "react";
import { useHistory } from "react-router";
import styles from "./book_card.module.css";

const BookCard = ({ book }) => {
  const history = useHistory();
  const goToDetail = () => {
    history.push({
      pathname: "/detail",
      book: book,
    });
  };

  console.log(book);
  const { title, publisher, thumbnail, contents } = book;
  return (
    <li className={styles.book} onClick={goToDetail}>
      <div className={styles.container}>
        <img src={thumbnail} alt="" />
        <h5>{title}</h5>
      </div>
    </li>
  );
};

export default BookCard;
