import React, { useState, useEffect } from "react";
import styles from "./calendar.module.css";
import WeekHeader from "../../components/weekHeader/weekHeader";
import WeekContainer from "../../components/weeks/weekContainer";
import moment from "moment";
import CalendarHeader from "../../components/calendarHeader/calendarHeader";

const Calendar = (props) => {
  const [YM, setYM] = useState(moment());

  const moveMonth = (month) => {
    setYM(moment(YM).add(month, "M"));
    console.log(moment(YM).format("YYYY년 MM월"));
  };
  return (
    <div className={styles.container}>
      <CalendarHeader moveMonth={moveMonth} YM={moment(YM).format("YYYY년 MM월")} />
      <div className={styles.calendar}>
        <WeekHeader />
        <WeekContainer YM={YM} />
      </div>
    </div>
  );
};

export default Calendar;
