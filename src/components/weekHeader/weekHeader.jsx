import React from "react";
import styles from "./weekHeader.module.css";

const DateHeader = (props) => {
  return (
    <ul className={styles.weeks}>
      <li className={`${styles.week} ${styles.sunday}`}>
        <p>일</p>
      </li>
      <li className={styles.week}>
        <p>월</p>
      </li>
      <li className={styles.week}>
        <p>화</p>
      </li>
      <li className={styles.week}>
        <p>수</p>
      </li>
      <li className={styles.week}>
        <p>목</p>
      </li>
      <li className={styles.week}>
        <p>금</p>
      </li>
      <li className={`${styles.week} ${styles.saturday}`}>
        <p>토</p>
      </li>
    </ul>
  );
};

export default DateHeader;
