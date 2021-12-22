import ChatItem from "./chatItem";
import { firebaseDB } from "./firebase";

const sendChat = (chats) => {
  const chatArr = new Array();
  console.log(chats);
  chats.map((chat) => {
    console.log(chat.uid);
    firebaseDB.ref(`chats/${chat.uid}`).push(chat);
    chatArr.push(chat);
  });

  return chatArr;
};

const chatbotChat = (uid, messages) => {
  const chatArr = new Array();
  messages.map((message) => {
    const chat = new ChatItem(message, Date.now, uid, "chatbot");
    firebaseDB.ref(`chats/${uid}`).push({
      message,
      timestamp: Date.now(),
      uid,
      type: "chatbot",
    });
    chatArr.push(new ChatItem(message, Date.now, uid, "chatbot"));
  });

  //const chats = new ChatItem("안녕", Date.now(), uid, "chatbot");
  console.log(chatArr);
  //firebaseDB.ref(`chats/${uid}`).push(chat);
  return chatArr;
};

const receiveChat = (uid, onUpdate) => {
  let chatList = [];
  const ref = firebaseDB.ref("chats/" + uid).orderByChild("timestamp");
  ref.once("value", (snapshot) => {
    snapshot.forEach((item) => {
      chatList.push(item.val());
    });
    console.log(chatList);
    chatList && onUpdate(chatList);
  });

  return () => ref.off();
};

const resetChat = (uid) => {
  const ref = firebaseDB.ref("chats/" + uid).remove();
  return () => ref.off();
};
export default { sendChat, receiveChat, resetChat, chatbotChat };
