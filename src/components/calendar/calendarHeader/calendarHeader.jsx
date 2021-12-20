import React from "react";
import styles from "./calendarHeader.module.css";
import arrowRight from "../../../common/images/arrow_right.png";
import arrowLeft from "../../../common/images/arrow_left.png";

const CalendarHeader = ({ moveMonth, YM }) => {
  return (
    <div className={styles.header}>
      <button className={styles.btn}>
        <img
          className={styles.btn_img}
          src={arrowLeft}
          alt="left"
          onClick={() => moveMonth(-1)}
        />
      </button>
      <h2 className={styles.page}>{YM}</h2>
      <button className={styles.btn}>
        <img
          className={styles.btn_img}
          src={arrowRight}
          alt="right"
          onClick={() => moveMonth(1)}
        />
      </button>
    </div>
  );
};

export default CalendarHeader;
