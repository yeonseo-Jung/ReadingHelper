import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./profileEdit.module.css";
import BookList from "../../common/images/book_list.jpg";
import GoodStamp from "../../common/images/good_stamp.png";
import ThumbStamp from "../../common/images/thumb_stamp.PNG";

const ProfileEdit = (props) => {
  const history = useHistory();
  const goProfileEdit = () => {
    history.push("/profile/edit");
  };
  return (
    <div className={styles.container}>
      <span>회원정보 수정</span>
      <section className={styles.inputSection}>
        <div>
          <span>이름</span>
          <input type="text" />
        </div>
        <div>
          <span>이메일</span>
          <input type="text" />
        </div>
        <div>
          <span>비밀번호</span>
          <input type="text" />
        </div>
      </section>
    </div>
  );
};

export default ProfileEdit;
