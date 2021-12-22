export default class ChatItem {
  constructor(message, uid, type) {
    this.message = message;
    this.timestamp = Date.now();
    this.uid = uid;
    this.type = type;
  }
}
