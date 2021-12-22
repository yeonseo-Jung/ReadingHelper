import React from "react";
import styles from "./calendarHeader.module.css";
import arrowRight from "../../../common/images/arrow_right.png";
import arrowLeft from "../../../common/images/arrow_left.png";

const CalendarHeader = ({ moveMonth, YM }) => {
  return (
    <div className={styles.header}>
      <h2 className={`${styles.text} ${styles.year}`}>{YM.format("YYYY")}</h2>
      <div className={styles.divider}></div>
      <div className={styles.buttons}>
        <button className={styles.btn}>
          <img
            className={styles.btn_img}
            src={arrowLeft}
            alt="left"
            onClick={() => moveMonth(-1)}
          />
        </button>
        <h1 className={`${styles.text} ${styles.month}`}>{YM.format("MM")}</h1>
        <button className={styles.btn}>
          <img
            className={styles.btn_img}
            src={arrowRight}
            alt="right"
            onClick={() => moveMonth(1)}
          />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
