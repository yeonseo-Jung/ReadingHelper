import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./profile.module.css";
import BookList from "../../common/images/book_list.jpg";
import GoodStamp from "../../common/images/good_stamp.png";
import ThumbStamp from "../../common/images/thumb_stamp.PNG";

const Profile = (props) => {
  const history = useHistory();
  const goProfileEdit = () => {
    history.push("/profile/edit");
  };
  return (
    <div className={styles.container}>
      <section className={styles.leftSection}>
        <div className={styles.leftTitle}>책을 차곡차곡 쌓아봐요</div>
        <img src={BookList} alt="bookList" width="200" height="300" />
      </section>
      <section className={styles.rightSection}>
        <span className={styles.rightTitle}>내 정보 관리</span>
        <section className={styles.profileSection}>
          <div className={styles.profile}></div>
          <div className={styles.profileInfo}>
            <span className={styles.level}>Lv.1 독서 새싹</span>
            <span>사용자님</span>
          </div>
          <button className={styles.profileBtn} onClick={() => goProfileEdit()}>
            회원정보 수정
          </button>
        </section>
        <span className={styles.rightTitle}>보유 뱃지</span>
        <section className={styles.badgeSection}>
          <div className={styles.badge}>
            <img src={GoodStamp} alt="stamp" width="80" height="80" />
            <span className={styles.badgeTitle}>참 잘했어요!</span>
          </div>
          <div className={styles.badge}>
            <img src={ThumbStamp} alt="stamp" width="80" height="80" />
            <span className={styles.badgeTitle}>베스트셀러 수집가!</span>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Profile;
