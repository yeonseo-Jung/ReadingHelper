import React from "react";
import styles from "./day.module.css";

const Day = ({ weekNum, dayInfo }) => {
  return (
    <li className={styles.day}>
      <p>{dayInfo.getDay}</p>
    </li>
  );
};

export default Day;
