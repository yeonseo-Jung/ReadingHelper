import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import RoundButton from "../../components/common/buttons/round_button";
import styles from "./writeReport.module.css";
import { setPage } from "../../actions/page";
const WriteReport = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const historyState = history?.location?.state;
  const book = historyState !== undefined ? historyState.book : null;
  console.log(book);

  const [title, setTitle] = useState(
    book !== null
      ? book.title !== undefined
        ? book.title
        : book.book_title
      : ""
  );
  const [thumbnail, setThumbnail] = useState(
    book !== null
      ? book.thumbnail !== undefined
        ? book.thumbnail
        : book.book_thumbnail
      : ""
  );

  const goToLibrary = () => {
    alert("Library");
    dispatch(setPage("report"));
    history.push({
      pathname: "/library",
    });
  };
  const goToSearch = () => {
    alert("Search");
  };

  const submitReport = () => {
    alert("독후감이 작성되었습니다!");
  };
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  return (
    <section className={styles.container}>
      <div className={styles.imgContainer}>
        {thumbnail !== "" ? (
          <img className={styles.thumbnail} src={thumbnail} alt="thumbnail" />
        ) : (
          <div className={styles.buttons}>
            <RoundButton text="내서재에서 가져오기" onClick={goToLibrary} />
            <RoundButton text="검색하기" onClick={goToSearch} />
          </div>
        )}
      </div>

      <div>
        <form className={styles.form}>
          <input
            className={styles.title}
            placeholder="제목을 입력하세요"
            value={title}
            onChange={onTitleChange}
          />
          <div className={styles.divider}></div>
          <input
            className={styles.review}
            placeholder="감상평을 입력해주세요"
          />
          <input
            className={styles.submit}
            type="submit"
            value={"작성하기"}
            onClick={submitReport}
          />
        </form>
      </div>
    </section>
  );
};

export default WriteReport;
