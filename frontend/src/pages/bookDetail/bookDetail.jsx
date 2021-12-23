import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./bookDetail.module.css";
import thumbnailImg from "../../common/images/thumbnail.png";

const BookDetail = ({ library }) => {
  const history = useHistory();
  const historyState = history?.location?.state;

  const bookItem = historyState.book;
  const state = historyState.state;

  const book =
    bookItem === undefined
      ? JSON.parse(localStorage.getItem("book"))
      : bookItem;
  const { title, thumbnail, contents, authors, publisher, translators } = book;

  const thumbnail_img = thumbnail.length > 0 ? thumbnail : thumbnailImg;
  const author = authors.length > 0 ? authors.join(", ") : "";
  const translator = translators.length > 0 ? translators.join(", ") : "";

  const saveBook = async (readDate, memo, state) => {
    const newBook = { ...book, readDate, memo };
    const arr = newBook["isbn"].split(" ");
    newBook["isbn"] = arr[1];
    const res = await library.saveBook(newBook);
    switch (state) {
      case "library":
        alert("내서재에 담겼습니다!");
        break;
      case "calendar":
        alert("독서달력에 저장했습니다!");
        break;
      default:
        break;
    }
  };

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
            {author === "" && (
              <li className={styles.author}>
                <h3 className={styles.author_title}>저자</h3>
                <p className={styles.author_name}>{author}</p>
              </li>
            )}
            {translator === "" > 0 && (
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
      <div className={styles.buttons}>
        {state === "library" && (
          <div>
            <button onClick={() => saveBook(new Date(), "", "calendar")}>
              다 읽었어요!
            </button>
            <button>독후감 작성</button>
          </div>
        )}
        {state === "search" && (
          <div>
            <button onClick={() => saveBook("", "", "library")}>
              내서재 담기
            </button>
            <button>독후감 작성</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookDetail;
