import { firebaseDB } from "./firebase";

const sendChat = (data) => {
  console.log("send", data);
  const chatArr = [
    {
      message: data.message,
      timestamp: data.timestamp,
      uid: data.uid,
      type: "user",
    },
    {
      message: "좋은 하루 보내세요😆🐶",
      timestamp: data.timestamp + 1,
      type: "chatbot",
    },
  ];
  firebaseDB.ref(`chats/${data.uid}`).push(chatArr[0]);
  firebaseDB.ref(`chats/${data.uid}`).push(chatArr[1]);
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
export default { sendChat, receiveChat, resetChat };
