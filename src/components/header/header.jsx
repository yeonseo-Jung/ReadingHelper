import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RoundButton from "../buttons/round_button";
import styles from "./header.module.css";
import SearchBar from "../searchBar/searchBar";
import logoIcon from "../../common/images/title_icon.jpg";
import { logout } from "../../actions/auth";

const Header = ({ onSearch }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logolink}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={logoIcon} alt="" />
          <h2 className={`${styles.logoTitle} ${styles.yello}`}>독</h2>
          <h2 className={`${styles.logoTitle} ${styles.green}`}>서</h2>
          <h2 className={`${styles.logoTitle} ${styles.yello}`}>비</h2>
          <h2 className={`${styles.logoTitle} ${styles.green}`}>서</h2>
        </div>
      </Link>
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
        {currentUser ? (
          <ul className={styles.buttons}>
            <li className={styles.button}>
              <span className={styles.userName}>{currentUser.name || "사용자"}님 환영합니다👋</span>
              <Link to="/profile">
                <RoundButton text="내 정보" />
              </Link>
            </li>
            <li className={styles.button}>
              <Link to="/" onClick={() => dispatch(logout())}>
                <RoundButton text="로그아웃" />
              </Link>
            </li>
          </ul>
        ) : (
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
        )}
      </div>
    </header>
  );
};

export default Header;
