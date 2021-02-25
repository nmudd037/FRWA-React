import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  STOP_LOADING,
  UPDATE_USER_IMAGE_ENTRIES,
  USER_LOADED,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: action.payload };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, isAuthenticated: true, loading: false };
    case UPDATE_USER_IMAGE_ENTRIES:
      return { ...state, user: { ...state.user, entries: action.payload } };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return { ...state, error: null };
    case STOP_LOADING:
      return { ...state, loading: false };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};
