import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import styles from "./searchBar.module.css";
import searchIcon from "../../../common/images/search.png";

const SearchBar = ({ onSearch, initBooks }) => {
  const inputRef = useRef();
  const history = useHistory();
  const [text, setText] = useState("");

  const goToSearch = () => {
    history.push({
      pathname: "/search",
    });
  };

  const handleSearch = async () => {
    const keyword = inputRef.current.value;
    if (!keyword) {
      alert("검색어를 입력하세요.");
    } else {
      // history.push({
      //   pathname: "/search",
      // });
      setText("");
      await onSearch(keyword, 1);
    }
  };
  const onClick = (event) => {
    console.log(inputRef.current.value);
    handleSearch();
  };

  const onKeyPress = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };
  const onChange = (event) => {
    setText(event.target.value);
  };
  return (
    <header className={styles.container}>
      <form>
        <input
          ref={inputRef}
          className={styles.input}
          value={text}
          placeholder="검색어를 입력해주세요.."
          onChange={onChange}
          onKeyPress={onKeyPress}
          onClick={goToSearch}
        />
      </form>
      <button className={styles.button}>
        <img
          className={styles.buttonImg}
          src={searchIcon}
          alt="search"
          onClick={onClick}
        />
      </button>
    </header>
  );
};

export default SearchBar;
