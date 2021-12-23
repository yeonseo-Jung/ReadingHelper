export default class ChatItem {
  constructor(message, type, uid) {
    this.type = type;
    this.message = message;
    this.timestamp = Date.now();
    this.uid = uid || "";
  }
}
