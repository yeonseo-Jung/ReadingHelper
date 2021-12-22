import React from "react";
import styles from "./weekContainer.module.css";
import Week from "./week";
const WeekContainer = ({ days }) => {
  const _Weeks = [];
  console.log(days);

  for (let i = 0; i < 6; i++) {
    _Weeks.push(<Week days={days.slice(i * 7, i * 7 + 7)} />);
  }

  return <div className={styles.container}>{_Weeks}</div>;
};

export default WeekContainer;
