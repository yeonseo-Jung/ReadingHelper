import { SELECT_BOOK, DONE_REPORT, WRITE_REPORT, MAKE_QUESTION } from "../actions/types";

const questionList = localStorage.getItem("question");
const selectedBook = localStorage.getItem("selectedBook");
const initialState = questionList
  ? { isSelectBook: true, selectedBook, questionList }
  : { isSelectBook: false, selectedBook: null, questionList: [] };

// type에 따른 state 변경 수행
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_BOOK:
      return {
        ...state,
        isSelectBook: true,
        selectedBook: payload,
      };
    case MAKE_QUESTION:
      console.log("reducer:", payload);
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
      };
    default:
      return state;
  }
}
