export default class ChatbotItem {
  constructor(message, questionNum, uid) {
    this.type = "chatbot";
    this.message = message;
    this.questionNum = questionNum;
    this.timestamp = Date.now();
    this.uid = uid || "";
  }
}
