import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import styles from "./chat.module.css";
import ChatService from "../../service/chatService";
import Chatbot from "../../common/images/dogIcon.png";
import ChatbotChat from "./chatbotChat";
import UserChat from "./userChat";
import { doneChat, doneReport, selectBook, sendChat } from "../../actions/chat";
import ChatItem from "../../service/chatItem";
import chat from "../../reducers/chat";
import BubbleChat from "./bubbleChat";

const Chat = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isSelectBook, selectedBook, questionList, chatId } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  // 유저 uid가 없기 때문에 이메일의 @ 앞 문자열을 임시 uid로 설정했습니다.
  const [tempUid, setTempUid] = useState((currentUser && currentUser.email.split("@")[0]) || "");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const history = useHistory();
  const formRef = useRef();
  const chatRef = useRef();

  console.log("책 선택했나요?:", isSelectBook, "책:", selectedBook, "채팅 아이디:", chatId);
  console.log("질문 리스트:", questionList);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      handleSubmit(e);
    }
  };
  // 채팅 입력시의 동작 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.reset();

    if (message === "") return;

    // 로그인한 상태일 때
    if (currentUser) {
      // 질문이 남아있다면 사용자 메세지를 저장하고, 질문 리스트 맨 앞 요소를 제거
      if (questionList.length !== 0) {
        // 파이어베이스 DB에 채팅을 저장
        const chatArr = dispatch(sendChat(tempUid, message, questionList, chatId));
        updateChat(chatArr);
      } else {
        // 질문이 남아있지 않지만, 책을 선택했다면 마지막 질문에 대한 답
        if (isSelectBook) {
          // 독후감 채팅이 끝났으므로 모든 state 값 초기화
          const chatArr = dispatch(doneChat(tempUid, message, chatId));
          updateChat(chatArr);
        } else {
          // 책을 선택하지 않고 채팅을 친 경우
          updateChat([new ChatItem("책을 선택해야 저와 대화할 수 있어요😎", "", "book")]);
        }
      }
    } else {
      // 로그인 안 한 상태일 때
      // 파이어베이스 DB에 저장을 하지 않고, chats state만 업데이트
      const chatArr = [];
      chatArr.push(new ChatItem(message, "user"));
      chatArr.push(new ChatItem("로그인을 하면 저와의 대화가 독후감으로 완성된답니다. 😊", "chatbot"));
      updateChat(chatArr);
    }
  };

  // 새로운 채팅 내용으로 채팅 view를 변환하기 위함
  const updateChat = useCallback(
    (chatArr) => {
      setChats(() => {
        const updated = [...chats];
        chatArr.map((chat) => {
          updated.push(chat);
        });
        console.log("updateChat: ", updated);
        return updated;
      });
    },
    [chats]
  );

  // 페이지 첫 로딩시 DB에서 대화 내용을 가져옴
  const recieveChat = () => {
    if (currentUser) {
      const stopSync = ChatService.receiveChat(tempUid, (chats) => {
        setChats(chats);
        console.log(chats);
      });
      return () => stopSync();
    }
  };

  // 책 검색 연동: 책 버튼을 눌렀을 때 검색 페이지로 넘어감
  const handleSearch = useCallback(() => {
    //history.push("/search");
    if (isSelectBook) return;
    if (currentUser) {
      // 채팅 묶음을 구별하기 위해 현재 시간을 DB의 chatId로 설정
      const chatId = Date.now();
      const chatArr = dispatch(selectBook(tempUid, currentUser.name, chatId));
      console.log("chat:", questionList);
      updateChat(chatArr);
    } else {
      updateChat([new ChatItem("이 뒤의 기능이 궁금하지 않나요? 로그인 해서 이용해보세요! 🙌", "chatbot")]);
    }
  }, [isSelectBook, currentUser, dispatch, questionList, tempUid, updateChat]);

  // 대화 내용 초기화
  const handleReset = (e) => {
    e.preventDefault();
    formRef.current.reset();
    // 로그인한 경우: DB 데이터, state 모두 삭제
    if (currentUser) {
      const stopSync = ChatService.resetChat(tempUid);
      setChats([]);
      dispatch(doneReport());
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
          </li>
        </div>
        <BubbleChat message={"읽은 책을 선택해보세요!"} handleSearch={handleSearch} />
        {Object.keys(chats).map((key) => {
          switch (chats[key].type) {
            case "user":
              return <UserChat key={key} message={chats[key].message} />;
            case "chatbot":
              return <ChatbotChat ref={chatRef} key={key} message={chats[key].message} />;
            case "book":
              return <BubbleChat ref={chatRef} key={key} message={chats[key].message} handleSearch={handleSearch} />;
            case "bubble":
              return (
                <BubbleChat
                  isBubble={true}
                  ref={chatRef}
                  key={key}
                  message={chats[key].message}
                  handleSearch={handleSearch}
                />
              );
            default:
              console.log("chat error");
              break;
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
