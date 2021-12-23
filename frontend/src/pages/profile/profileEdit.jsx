import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./profileEdit.module.css";
import BookList from "../../common/images/book_list.jpg";
import GoodStamp from "../../common/images/good_stamp.png";
import ThumbStamp from "../../common/images/thumb_stamp.PNG";
import RoundButton from "../../components/common/buttons/round_button";

const ProfileEdit = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [name, setName] = useState(currentUser.name);
  const [password, setPassword] = useState("");

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
    history.push("/profile");
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원정보 수정</h2>
      <form className={styles.form}>
        <div className={styles.item}>
          <span className={styles.inputTitle}>이름</span>
          <input className={styles.input} type="text" value={currentUser.name} onChange={onChangeName} />
        </div>
        <div className={styles.item}>
          <span className={styles.inputTitle}>이메일</span>
          <span className={styles.email}>{currentUser.email}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.inputTitle}>비밀번호</span>
          <input className={styles.input} type="password" onChange={onChangePassword} />
        </div>
      </form>
      <div
        className={styles.buttons}
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        <RoundButton type="submit" text="수정" />
      </div>
    </div>
  );
};

export default ProfileEdit;
