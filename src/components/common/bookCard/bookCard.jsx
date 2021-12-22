import React from "react";
import { useHistory } from "react-router";
import styles from "./bookCard.module.css";
const BookCard = ({ book, state, deleteBook }) => {
  const history = useHistory();
  const goToDetail = () => {
    history.push({
      pathname: "/detail",
      state: { book, state },
    });
  };
  const deleteCard = (event) => {
    event.stopPropagation();
    console.log("delete");
  };
  const { title, thumbnail } = book;
  return (
    <li className={styles.container} onClick={goToDetail}>
      <div className={styles.book}>
        <div className={styles.thumbnail}>
          <img src={thumbnail} alt="" />
          <button className={styles.button} onClick={deleteCard}>
            삭제하기
          </button>
        </div>

        <h5>{title}</h5>
      </div>
    </li>
  );
};

export default BookCard;
