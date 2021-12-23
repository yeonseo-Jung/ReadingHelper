import React, { memo, forwardRef } from "react";
import styles from "./chat.module.css";
import Chatbot from "../../common/images/dogIcon.png";

const ChatbotChat = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={styles.chatbotSection}>
      <img className={styles.chatbot} src={Chatbot} width="60" height="60" alt="chatbot" />
      <li className={styles.chatbotMsg}>
        <span className={styles.chatbotName}>독서 비서</span>
        <span className={styles.msg}>{props.message}</span>
      </li>
    </div>
  );
});

export default memo(ChatbotChat);
