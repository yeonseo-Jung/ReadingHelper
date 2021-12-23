import React, { useState, useEffect } from "react";
import styles from "./calendar.module.css";
import WeekHeader from "../../components/calendar/weekHeader/weekHeader";
import WeekContainer from "../../components/calendar/weeks/weekContainer";
import moment from "moment";
import CalendarHeader from "../../components/calendar/calendarHeader/calendarHeader";

const Calendar = ({ library }) => {
  const [YM, setYM] = useState(moment());

  const firstDayOfMonth = YM.startOf("month");
  const daysCount = YM.daysInMonth();
  const firstDateOfMonth = firstDayOfMonth.get("d");
  const firstDayOfWeek = firstDayOfMonth.clone().add("d", -firstDateOfMonth);
  const [days, setDays] = useState([]);
  const [res, setRes] = useState([
    {
      id: 1,
      read_date: "2021-12-19T08:37:57.000+00:00",
      book: {
        id: 1,
        title: "book1",
        thumbnail:
          "http://image.yes24.com/momo/TopCate345/MidCate002/34410155.jpg",
      },
    },
    {
      id: 2,
      read_date: "2021-12-29T08:37:57.000+00:00",
      book: {
        id: 2,
        title: "book2",
        thumbnail:
          "http://image.yes24.com/momo/TopCate345/MidCate002/34410155.jpg",
      },
    },
    {
      id: 3,
      read_date: "2021-12-11T08:37:57.000+00:00",
      book: {
        id: 3,
        title: "book3",
        thumbnail:
          "http://image.yes24.com/momo/TopCate345/MidCate002/34410155.jpg",
      },
    },
  ]);
  /*
  useEffect(() => {
    const getBooks = async () => {
      const response = await library.loadCalendar();
      console.log(response);
      const result = response.data;
      console.log(result);
    };
    getBooks();
  }, []);
	*/

  useEffect(() => {
    let firstDay = firstDateOfMonth;
    let prevLastDay = Number(firstDayOfWeek.format("DD"));
    let arr_before = [];
    let arr_now = [];
    let arr_next = [];
    for (let i = 0; i < firstDateOfMonth; i++) {
      arr_before.push({ day: prevLastDay, week: i, state: false, book: null });
      prevLastDay++;
    }
    for (let i = 1; i <= daysCount; i++) {
      arr_now.push({ day: i, week: firstDay % 7, state: true, book: null });
      firstDay++;
    }
    console.log(res);
    for (let i = 0; i < res.length; i++) {
      const readDate = res[i].read_date;
      const date = new Date(readDate);
      console.log(date);
      console.log(date.getDate());
      arr_now[date.getDate()].book = res[i].book;
    }
    console.log(arr_now);
    for (let i = 1; i <= 42 - daysCount - firstDateOfMonth; i++) {
      arr_next.push({ day: i, week: firstDay % 7, state: false, book: null });
      firstDay++;
    }
    const new_arr = arr_before.concat(arr_now, arr_next);
    console.log(new_arr);
    setDays(new_arr);
  }, [YM]);

  const moveMonth = (month) => {
    setYM(moment(YM).add(month, "M"));
    console.log(moment(YM).format("YYYY년 MM월"));
  };
  return (
    <div className={styles.container}>
      <CalendarHeader moveMonth={moveMonth} YM={moment(YM)} />
      <div className={styles.calendar}>
        <WeekHeader />
        {days.length > 0 && <WeekContainer YM={YM} days={days} />}
      </div>
    </div>
  );
};

export default Calendar;
