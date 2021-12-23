import React from "react";
import styles from "./day.module.css";

const Day = ({ dayInfo }) => {
  const { day, week, state, book } = dayInfo;
  return (
    <li className={styles.container}>
      {state ? (
        <p className={`${styles.day} ${weekStyle(week)}`}>{day}</p>
      ) : (
        <p className={`${styles.day} ${styles.notDay}`}>{day}</p>
      )}
      <div>
        {book !== null && (
          <img
            className={styles.thumbnail}
            src={book.thumbnail}
            alt="thumbnail"
          />
        )}
      </div>
    </li>
  );
};

function weekStyle(num) {
  switch (num) {
    case 0:
      return styles.sun;
    case 6:
      return styles.sat;
    default:
      return;
  }
}

export default Day;
