import React, { memo } from "react";
import styles from "./chat.module.css";

const UserChat = ({ message }) => {
  return (
    <div className={styles.mySection}>
      <li className={styles.myMsg}>
        <span className={styles.msg}>{message}</span>
      </li>
    </div>
  );
};

export default memo(UserChat);
