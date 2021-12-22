import React from "react";
import RoundButton from "../../components/common/buttons/round_button";
import styles from "./writeReport.module.css";
const WriteReport = (props) => {
  const goToLibrary = () => {
    alert("Library");
  };
  const goToSearch = () => {
    alert("Search");
  };

  const submitReport = () => {
    alert("독후감이 작성되었습니다!");
  };
  return (
    <section className={styles.container}>
      <div className={styles.buttons}>
        <RoundButton text="내서재에서 가져오기" onClick={goToLibrary} />
        <RoundButton text="검색하기" onClick={goToSearch} />
      </div>
      <div>
        <form className={styles.form}>
          <input className={styles.title} placeholder="제목을 입력하세요" />
          <div className={styles.divider}></div>
          <input
            className={styles.review}
            placeholder="감상평을 입력해주세요"
          />
          <input
            className={styles.submit}
            type="submit"
            value={"작성하기"}
            onClick={submitReport}
          />
        </form>
      </div>
    </section>
  );
};

export default WriteReport;
