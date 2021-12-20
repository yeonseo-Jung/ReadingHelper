import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import styles from "./chat.module.css";
import Chatbot from "../../common/images/dogIcon.png";
import ChatService from "../../service/chatService";
const Chat = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const history = useHistory();
  const formRef = useRef();
  const chatRef = useRef();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      handleSubmit(e);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.reset();
    console.log(e);
    if (message === "") return;
    // 로그인한 상태일 때
    if (currentUser) {
      // 유저 uid가 없기 때문에 이메일의 @ 앞 문자열을 임시 uid로 설정했습니다.
      const tempUid = currentUser.email.split("@")[0] || "";
      const chat = {
        message,
        timestamp: Date.now(),
        uid: tempUid,
        type: "user",
      };
      // 파이어베이스 DB에 채팅을 저장, chats state 업데이트
      const chatArr = ChatService.sendChat(chat);
      updateChat(chatArr);
    } else {
      // 로그인 안 한 상태일 때
      const chat = {
        message,
        timestamp: Date.now(),
        type: "user",
      };
      const chatbotChat = {
        message: "로그인을 하면 서비스를 이용할 수 있어요! 😊",
        timestamp: chat.timestamp + 1,
        type: "chatbot",
      };
      // 파이어베이스 DB에 저장을 하지 않고, chats state만 업데이트
      updateChat([chat, chatbotChat]);
    }
  };

  // 입력 채팅 내용으로 현 chats state 업데이트
  const updateChat = (chatArr) => {
    setChats(() => {
      const updated = [...chats];
      updated.push(chatArr[0]);
      updated.push(chatArr[1]);
      console.log("updateChat: ", updated);
      return updated;
    });
  };
  // 페이지 첫 로딩시 DB에서 대화 내용을 가져옴
  const recieveChat = () => {
    if (currentUser) {
      const tempUid = currentUser.email.split("@")[0];
      const stopSync = ChatService.receiveChat(tempUid, (chats) => {
        setChats(chats);
        console.log(chats);
      });
      return () => stopSync();
    }
  };
  // 책 검색 연동: 책 버튼을 눌렀을 때 검색 페이지로 넘어감
  const goSearch = () => {
    history.push("/search");
  };

  // 대화 내용 초기화
  const handleReset = (e) => {
    e.preventDefault();
    formRef.current.reset();
    // 로그인한 경우: DB 데이터, state 모두 삭제
    if (currentUser) {
      const tempUid = currentUser.email.split("@")[0];
      const stopSync = ChatService.resetChat(tempUid);
      setChats([]);
      return () => stopSync();
    }
    // 로그인 안 한 경우: state만 삭제
    setChats([]);
  };

  // 현재 유저가 바뀔 때마다 DB에서 대화 내용 가져옴
  useEffect(() => {
    console.log("changed");
    setChats([]);
    recieveChat();
  }, [currentUser]);

  // chats에 내용이 있고 없고에 따라 이동되는 위치가 다름
  useEffect(() => {
    if (chats.length === 0) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [chats]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>채팅으로 독후감을 작성해보세요 :)</header>
      <div className={styles.chatSection} ref={chatRef}>
        <div className={styles.chatbotSection} ref={chatRef}>
          <img className={styles.chatbot} src={Chatbot} width="60" height="60" alt="chatbot" />
          <li className={styles.chatbotMsg}>
            <span className={styles.chatbotName}>독서 비서</span>
            <span className={styles.msg}>안녕하세요. 저는 당신의 독서 비서랍니다😄</span>
            <div>
              <span className={styles.msg}>읽은 책을 선택해보세요!</span>
              <button className={styles.bookBtn} onClick={goSearch}>
                📚
              </button>
            </div>
          </li>
        </div>
        {Object.keys(chats).map((key) => {
          if (chats[key].type === "user") {
            return (
              <div key={key} className={styles.mySection}>
                <li className={styles.myMsg}>
                  <span className={styles.msg}>{chats[key].message}</span>
                </li>
              </div>
            );
          } else {
            return (
              <div key={key} className={styles.chatbotSection} ref={chatRef}>
                <img className={styles.chatbot} src={Chatbot} width="60" height="60" alt="chatbot" />
                <li className={styles.chatbotMsg}>
                  <span className={styles.chatbotName}>독서 비서</span>
                  <span className={styles.msg}>{chats[key].message}</span>
                </li>
              </div>
            );
          }
        })}
      </div>
      <form ref={formRef} className={styles.chatForm} onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        <button className={styles.resetBtn} onClick={handleReset}>
          초기화
        </button>
        <input
          className={styles.input}
          type="text"
          id="message"
          placeholder="메시지를 입력하세요"
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">
          전송
        </button>
      </form>
    </div>
  );
};

export default Chat;
