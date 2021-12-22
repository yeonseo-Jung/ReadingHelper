import React, { useEffect, useState } from "react";
import styles from "./week.module.css";
import Day from "./day";

const Week = ({ days }) => {
  return (
    <ul className={styles.container}>
      {days.map((dayInfo, i) => (
        <Day weekNum={i} dayInfo={dayInfo} />
      ))}
    </ul>
  );
};

export default Week;
