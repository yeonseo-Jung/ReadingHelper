import React, { useEffect, useState } from "react";
import BookCard from "../../components/book_card/book_card";
import styles from "./search_result.module.css";
import arrowRight from "../../common/images/arrow_right.png";
import arrowLeft from "../../common/images/arrow_left.png";

const SearchResult = ({ query, books, onSearch }) => {
  const [bookTitle, setBookTitle] = useState(query);
  const [booklist, setBookList] = useState(books);
  const [page, setPage] = useState(1);

  //새로고침 후에도 검색 결과를 유지
  useEffect(() => {
    console.log("한번");
    if (!booklist.length) {
      setBookList(JSON.parse(localStorage.getItem("books")));
      setBookTitle(JSON.parse(localStorage.getItem("query")));
      setPage(JSON.parse(localStorage.getItem("page")));
    }
  }, []);

  useEffect(() => {
    if (query.length) {
      setBookList(books);
      setBookTitle(query);
      localStorage.setItem("books", JSON.stringify(books));
      localStorage.setItem("query", JSON.stringify(query));
      localStorage.setItem("page", JSON.stringify(page));
    }
  }, [query, books]);

  useEffect(() => {
    if (query.length) {
      onSearch(bookTitle, page);
    }
  }, [page]);

  const movePage = (num) => {
    if (!(page === 1 && num === -1)) {
      setPage(page + num);
    }
  };

  return (
    <section className={styles.container}>
      <div>
        <h3>{`\'${bookTitle}\' 검색 결과`}</h3>
      </div>
      {booklist.length === 0 ? (
        <h3>검색결과가 없습니다.</h3>
      ) : (
        <ul className={styles.books}>
          {booklist.map((book) => (
            <BookCard key={book.isbn} book={book} />
          ))}
        </ul>
      )}
      <div className={styles.move_page}>
        <button className={styles.btn}>
          <img className={styles.btn_img} src={arrowLeft} alt="left" onClick={() => movePage(-1)} />
        </button>
        <h2 className={styles.page}>{page}</h2>
        <button className={styles.btn}>
          <img className={styles.btn_img} src={arrowRight} alt="right" onClick={() => movePage(1)} />
        </button>
      </div>
    </section>
  );
};

export default SearchResult;
