import { SELECT_BOOK, DONE_REPORT, MAKE_QUESTION } from "../actions/types";

const questionList = localStorage.getItem("question");
const selectedBook = localStorage.getItem("selectedBook");
const chatId = localStorage.getItem("chatId");
const initialState = questionList
  ? { isSelectBook: true, selectedBook, questionList, chatId }
  : { isSelectBook: false, selectedBook: null, questionList: [], chatId: null };

// type에 따른 state 변경 수행
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_BOOK:
      console.log(payload);
      return {
        ...state,
        isSelectBook: true,
        selectedBook: payload.book,
        chatId: payload.chatId,
      };
    case MAKE_QUESTION:
      return {
        ...state,
        questionList: payload,
      };
    case DONE_REPORT:
      return {
        ...state,
        isSelectBook: false,
        selectedBook: null,
        questionList: [],
        chatId: null,
      };
    default:
      return state;
  }
}
