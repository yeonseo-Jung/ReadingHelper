import React from "react";
import { useHistory } from "react-router";
import styles from "./bookCard.module.css";
const BookCard = ({ book, state }) => {
  const history = useHistory();
  const goToDetail = () => {
    history.push({
      pathname: "/detail",
      state: { book, state },
    });
  };
  const { title, thumbnail } = book;
  return (
    <li className={styles.container} onClick={goToDetail}>
      <div className={styles.container}>
        <img src={thumbnail} alt="" />
        <h5>{title}</h5>
      </div>
    </li>
  );
};

export default BookCard;
