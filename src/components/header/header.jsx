import React from "react";
import { Link } from "react-router-dom";
import RoundButton from "../buttons/round_button";
import styles from "./header.module.css";
import SearchBar from "../search_bar/search_bar";
import logoIcon from "../../common/images/title_icon.jpg";

const Header = ({ onSearch }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={logoIcon} alt="" />
        <h2 className={`${styles.logoTitle} ${styles.yello}`}>독</h2>
        <h2 className={`${styles.logoTitle} ${styles.green}`}>서</h2>
        <h2 className={`${styles.logoTitle} ${styles.yello}`}>비</h2>
        <h2 className={`${styles.logoTitle} ${styles.green}`}>서</h2>
      </div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <Link to="/library" className={styles.item}>
              내 서재
            </Link>
          </li>
          <li>
            <Link to="/report" className={styles.item}>
              독후감
            </Link>
          </li>
          <li>
            <Link to="/calendar" className={styles.item}>
              독서 달력
            </Link>
          </li>
        </ul>
      </nav>
      <SearchBar onSearch={onSearch} />
      <div>
        <ul className={styles.buttons}>
          <li className={styles.button}>
            <Link to="/login">
              <RoundButton text="로그인" />
            </Link>
          </li>
          <li className={styles.button}>
            <Link to="/join">
              <RoundButton text="회원가입" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
