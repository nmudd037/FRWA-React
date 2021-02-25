import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';

import setAuthToken from '../../utils/setAuthToken';
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
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

// Create a custom hook to use the auth context
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

// Action creators
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Load User
export const loadUser = async (dispatch) => {
  try {
    const res = await axios.get('https://frwa-server-v2.herokuapp.com/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data.user });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: !err.response ? 'Server Down! Please try again!' : err.response.data.msg,
    });
  }
};

// Register User
export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post(
      'https://frwa-server-v2.herokuapp.com/api/users',
      formData,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: !err.response ? 'Server Down! Please try again!' : err.data.msg,
    });
  }
};

// Login User
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('https://frwa-server-v2.herokuapp.com/api/auth', formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    await loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: !err.response ? 'Server Down! Please try again!' : err.response.data.msg,
    });
  }
};

// Logout
export const logout = (dispatch) => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

// Stop Loading
export const stopLoading = (dispatch) => dispatch({ type: STOP_LOADING });

// Update User Image Entries
export const updateUserImgEntries = (dispatch, entries) => {
  dispatch({
    type: UPDATE_USER_IMAGE_ENTRIES,
    payload: entries,
  });
};

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Set token on initial app loading
  setAuthToken(state.token);

  // Load user on first run or refresh
  if (state.loading && state.token) {
    loadUser(dispatch);
  }

  // 'watch' state.token  on any change
  useEffect(() => {
    // Set Loading to False if no token present in local storage
    if (!state.token) {
      return stopLoading(dispatch);
    }
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{
        state: state,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
