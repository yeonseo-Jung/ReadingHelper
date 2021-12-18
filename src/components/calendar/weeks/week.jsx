import React, { useEffect, useState } from "react";
import styles from "./week.module.css";
import Day from "./day";

const Week = ({ firstDayFormat }) => {
  const [days, setDays] = useState([]);
  useEffect(() => {
    let _days = [];
    for (let i = 0; i < 7; i++) {
      const Day = firstDayFormat.add("d", 1);
      _days.push({
        yearMonthDayFormat: Day.format("YYYY-MM-DD"),
        getDay: Day.format("D"),
      });
      setDays(_days);
    }
  }, [firstDayFormat]);

  return (
    <ul className={styles.container}>
      {days.map((dayInfo, i) => (
        <Day weekNum={i} dayInfo={dayInfo} />
      ))}
    </ul>
  );
};

export default Week;
