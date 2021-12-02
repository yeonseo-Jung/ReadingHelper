import React, { useRef } from "react";
import { useHistory } from "react-router";
import styles from "./search_bar.module.css";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef();
  const history = useHistory();

  const handleSearch = async () => {
    const keyword = inputRef.current.value;
    history.push({
      pathname: "/search",
    });
    await onSearch(keyword);
  };
  const onClick = (event) => {
    console.log(inputRef.current.value);
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <header className={styles.search}>
      <input ref={inputRef} className={styles.input} placeholder="검색어를 입력해주세요.." onKeyPress={onKeyPress} />
      <button className={styles.button}>
        <img className={styles.buttonImg} src="/images/search.png" alt="search" onClick={onClick} />
      </button>
    </header>
  );
};

export default SearchBar;
