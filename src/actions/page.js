import { PAGE_STATE } from "./types";

export const setPage = (page) => (dispatch) =>
  dispatch({
    type: PAGE_STATE,
    payload: { page },
  });
