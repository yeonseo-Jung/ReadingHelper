import React from "react";
import styles from "./weekContainer.module.css";
import Week from "./week";
const WeekContainer = ({ YM }) => {
  const firstDayOfMonth = YM.startOf("month");
  const firstDateOfMonth = firstDayOfMonth.get("d");
  const firstDayOfWeek = firstDayOfMonth.clone().add("d", -firstDateOfMonth);
  const _Weeks = [];

  for (let i = 0; i < 6; i++) {
    _Weeks.push(<Week firstDayFormat={firstDayOfWeek.clone().add("d", i * 7 - 1)} />);
  }

  return <div className={styles.container}>{_Weeks}</div>;
};

export default WeekContainer;
