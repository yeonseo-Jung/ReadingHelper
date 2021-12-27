import { PAGE_STATE } from "../actions/types";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PAGE_STATE:
      return {
        page: payload.page,
      };
    default:
      return state;
  }
}
