import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import styles from "./bookCard.module.css";
const BookCard = ({ book, deleteBook, kakaoSearch, state }) => {
  const history = useHistory();
  useSelector((state) => console.log(state));

  const { page } = useSelector((state) => state.page);
  const goToDetail = async () => {
    console.log("click");
    console.log(page);
    if (page === "report") {
      history.push({
        pathname: "/report/write",
        state: { book },
      });
    } else if (state === "search") {
      history.push({
        pathname: "/detail",
        state: { book, state },
      });
    } else if (state === "library") {
      await kakaoSearch
        .search(book.book_isbn, 1) //
        .then((books) => {
          const tmp = books.data.documents[0];
          console.log(tmp);
          history.push({
            pathname: "/detail",
            state: { book: tmp, state },
          });
        });
    }
  };
  const deleteCard = (event) => {
    event.stopPropagation();
    console.log("delete");
    deleteBook(book.id);
  };
  const title = state === "search" ? book.title : book.book_title;
  const thumbnail = state === "search" ? book.thumbnail : book.book_thumbnail;

  return (
    <li className={styles.container} onClick={goToDetail}>
      <div className={styles.book}>
        <div className={styles.thumbnail}>
          <img src={thumbnail} alt="" />
          {state === "library" && (
            <button className={styles.button} onClick={deleteCard}>
              삭제하기
            </button>
          )}
        </div>
        <h5>{title}</h5>
      </div>
    </li>
  );
};

export default BookCard;
