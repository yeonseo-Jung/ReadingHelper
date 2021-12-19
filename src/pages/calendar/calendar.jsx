import React, { useState, useEffect } from "react";
import styles from "./calendar.module.css";
import WeekHeader from "../../components/calendar/weekHeader/weekHeader";
import WeekContainer from "../../components/calendar/weeks/weekContainer";
import moment from "moment";
import CalendarHeader from "../../components/calendar/calendarHeader/calendarHeader";

const Calendar = (props) => {
  const [YM, setYM] = useState(moment());

  const firstDayOfMonth = YM.startOf("month");
  const daysCount = YM.daysInMonth();
  const firstDateOfMonth = firstDayOfMonth.get("d");
  const firstDayOfWeek = firstDayOfMonth.clone().add("d", -firstDateOfMonth);
  const [days, setDays] = useState([]);

  useEffect(() => {
    let firstDay = firstDateOfMonth;
    let prevLastDay = Number(firstDayOfWeek.format("DD"));
    let arr_before = [];
    let arr_now = [];
    let arr_next = [];
    for (let i = 0; i < firstDateOfMonth; i++) {
      arr_before.push({ date: prevLastDay, week: i, state: false });
      prevLastDay++;
    }
    for (let i = 1; i <= daysCount; i++) {
      arr_now.push({ date: i, week: firstDay % 7, state: true });
      firstDay++;
    }
    for (let i = 1; i <= 42 - daysCount - firstDateOfMonth; i++) {
      arr_next.push({ date: i, week: firstDay % 7, state: false });
      firstDay++;
    }
    const new_arr = arr_before.concat(arr_now, arr_next);
    setDays(new_arr);
  }, [YM]);

  const moveMonth = (month) => {
    setYM(moment(YM).add(month, "M"));
    console.log(moment(YM).format("YYYY년 MM월"));
  };
  return (
    <div className={styles.container}>
      <CalendarHeader
        moveMonth={moveMonth}
        YM={moment(YM).format("YYYY년 MM월")}
      />
      <div className={styles.calendar}>
        <WeekHeader />
        <WeekContainer YM={YM} />
      </div>
    </div>
  );
};

export default Calendar;
