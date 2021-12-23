import React from "react";
import styles from "./weekHeader.module.css";

const DateHeader = () => {
  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <ul className={styles.weeks}>
      {weeks.map((week) => (
        <li className={styles.week}>
          <p>{week}</p>
        </li>
      ))}
    </ul>
  );
};

export default DateHeader;
