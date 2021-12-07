import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, useHistory } from "react-router-dom";
import axios from "axios"; // 액시오스
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { KAKAO_AUTH_URL } from "../../functions/oauth";
import RequestHandler from "../../functions/requestHandler";
import LoginIcon from "../../common/images/login_character.jpeg";
import KakaoIcon from "../../common/images/kakao_icon.png";
import NaverIcon from "../../common/images/naver_icon.png";
import styles from "./login.module.css";
import RoundButton from "../../components/buttons/round_button";

function Login({ getLoginInfo }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const history = useHistory();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSubmit = (type) => {
    setLoading(true);

    dispatch(login(type, username, password))
      .then(() => {
        console.log("login");
        history.push("/");
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(false);
    // if (!email || !password) {
    // 	alert('아이디 또는 비밀번호를 입력해주세요.');
    // 	return;
    // }
    // const data = {
    // 	type: 'login',
    // 	email,
    // 	password,
    // };
    // getLoginInfo(data);
    // history.push('/login/callback/own');
  };
  return (
    <div>
      <div className={styles.login}>
        <section className={styles.logo}>
          <h1 className={styles.title}>로그인</h1>
          <img src={LoginIcon} width="80" height="110" alt="title" />
          <span>독비에 오신걸 환영합니다!</span>
        </section>
        <form
          onSubmit={() => {
            handleSubmit("own");
          }}
          className={styles.form}
        >
          <input
            className={styles.input}
            type="text"
            name="id"
            placeholder="아이디"
            onChange={onChangeUsername}
          />
          <input
            className={styles.input}
            type="text"
            name="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
          />
          <span className={styles.forgetPW} href="#!">
            비밀번호를 잊으셨나요?
          </span>
          <RoundButton type="submit" text="로그인" />
          <span className={styles.login_line}></span>
          <div className={styles.social_title}>간편 로그인</div>
        </form>
        <section className={styles.social_login}>
          <button className={styles.button} href={KAKAO_AUTH_URL}>
            <img src={KakaoIcon} alt="kakao" className={styles.social_icon} />
            카카오로
            <br />
            시작하기
          </button>
          <button
            className={styles.button}
            onClick={() => {
              handleSubmit("naver");
            }}
          >
            <img src={NaverIcon} alt="kakao" className={styles.social_icon} />
            네이버로
            <br />
            시작하기
          </button>
        </section>
      </div>
    </div>
  );
}
export default Login;
