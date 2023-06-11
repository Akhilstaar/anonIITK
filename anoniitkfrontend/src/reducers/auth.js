import { REGISTER_FAIL, REGISTER_SUCCESS, SET_AUTH_LOADING, REMOVE_AUTH_LOADING } from "../../../anoniitkfrontend/src/actions/types";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        register_success: true
      }
    case REGISTER_FAIL:
      return {
        ...state,
        // register_success: false
      }
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true
      }
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false
      }

    default:
      return state;
  }
};

export default authReducer;
