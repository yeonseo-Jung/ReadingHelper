import React from "react";
import styles from "./day.module.css";

const Day = ({ weekNum, dayInfo }) => {
  const thumbnail =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQsxgrPHuMFqeFdFtApOUkqM0enHNnW2gYQ&usqp=CAU";
  return (
    <li className={styles.container}>
      <p className={styles.day}>{dayInfo.getDay}</p>
      <div className={styles.img}>
        {dayInfo.getDay === "5" && <img className={styles.thumbnail} src={thumbnail} alt="thumbnail" />}
      </div>
    </li>
  );
};

export default Day;
