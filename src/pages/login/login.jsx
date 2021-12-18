import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, getNaverUrl, getKakaoUrl } from "../../actions/auth";
import { useHistory, Redirect } from "react-router-dom";
import LoginIcon from "../../common/images/login_character.jpeg";
import KakaoIcon from "../../common/images/kakao_icon.png";
import NaverIcon from "../../common/images/naver_icon.png";
import styles from "./login.module.css";
import RoundButton from "../../components/common/buttons/round_button";
import LoadSpinner from "../../components/common/loadSpinner/loadSpinner";

function Login({ getLoginInfo }) {
  const formRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const history = useHistory();
  const dispatch = useDispatch();
  const onChangeUsername = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    }
    setLoading(true);
    const userInfo = {
      type: "login",
      email,
      password,
    };
    dispatch(login(userInfo))
      .then(() => {
        /*
						user =
						{
							access_token: "",
							name: "",
							email: "" 
						}
					*/
        setTimeout(() => {
          history.push("/");
          setLoading(false);
        }, 500);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // if (isLoggedIn) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div>
      <div className={styles.login}>
        {loading && <LoadSpinner />}
        <section className={styles.logo}>
          <h1 className={styles.title}>로그인</h1>
        </section>
        <form
          ref={formRef}
          onSubmit={(e) => {
            handleSubmit(e);
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
          <button className={styles.button} onClick={() => getKakaoUrl()}>
            <img src={KakaoIcon} alt="kakao" className={styles.social_icon} />
            카카오로
            <br />
            시작하기
          </button>
          <button
            className={styles.button}
            onClick={() => {
              getNaverUrl();
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
