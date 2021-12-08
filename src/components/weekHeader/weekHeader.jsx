import React from "react";
import styles from "./weekHeader.module.css";

const DateHeader = (props) => {
  return (
    <ul className={styles.weeks}>
      <li className={`${styles.week} ${styles.sunday}`}>일</li>
      <li className={styles.week}>월</li>
      <li className={styles.week}>화</li>
      <li className={styles.week}>수</li>
      <li className={styles.week}>목</li>
      <li className={styles.week}>금</li>
      <li className={`${styles.week} ${styles.saturday}`}>토</li>
    </ul>
  );
};

export default DateHeader;
