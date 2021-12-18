import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RoundButton from "../common/buttons/round_button";
import styles from "./header.module.css";
import SearchBar from "./searchBar/searchBar";
import logoIcon from "../../common/images/logo-3.png";
import myPage from "../../common/images/profile.png";
import { logout } from "../../actions/auth";

const Header = ({ onSearch }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className={styles.container}>
      <section className={styles.top}>
        {currentUser ? (
          <ul className={styles.buttons}>
            <li>
              <span className={styles.userName}>
                {currentUser.name || "사용자"}님 환영합니다👋
              </span>
            </li>
            <li className={styles.button}>
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
              <Link to="/login" className={styles.link}>
                <p className={styles.text}>로그인</p>
              </Link>
            </li>
            <li className={styles.button}>
              <Link to="/join" className={styles.link}>
                <p className={styles.text}>회원가입</p>
              </Link>
            </li>
          </ul>
        )}
      </section>
      <header className={styles.header}>
        <Link to="/" className={styles.logolink}>
          <img className={styles.logoImg} src={logoIcon} alt="" />{" "}
        </Link>
        <nav className={styles.nav}>
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

        <Link to="/login">
          <img className={styles.mypage} src={myPage} alt="mypage" />
        </Link>
      </header>
      <div className={styles.searchBar}>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
