import { reducerCases } from "./constants";
export const initialState = {
  userInfo: undefined,
  currentPage: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_CURRENT_ADMIN_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    default:
      return state;
  }
};
export default reducer;
