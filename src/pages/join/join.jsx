import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./join.module.css";
import RoundButton from "../../components/common/buttons/round_button";
import { register } from "../../actions/auth";

const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwcheck, setPwcheck] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!email || !password) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    }
    if (password !== pwcheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    if (!regExp.test(email)) {
      alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    const userInfo = {
      type: "signup",
      name,
      email,
      password,
    };
    //getLoginInfo(data);
    dispatch(register(userInfo))
      .then(() => {
        setTimeout(() => {
          history.push("/");
        }, 500);
      })
      .catch(() => {
        console.log("register fail");
      });
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changePwCheck = (e) => {
    setPwcheck(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>
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
          name="name"
          placeholder="이름"
          onChange={changeName}
        />
        <input
          className={styles.input}
          type="text"
          name="id"
          placeholder="이메일"
          onChange={changeEmail}
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={changePassword}
        />
        <input
          className={styles.input}
          type="password"
          name="checkPassword"
          placeholder="비밀번호 확인"
          onChange={changePwCheck}
        />
        {password !== pwcheck && (
          <span className={styles.pwCheck}>비밀번호가 일치하지 않습니다.</span>
        )}
        <RoundButton type="submit" text="완료" />
      </form>
    </div>
  );
};
export default Join;
