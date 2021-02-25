import axios from 'axios';
import { useContext, useReducer } from 'react';

import {
  CLEAR_FRWA,
  ENTRIES_ERROR,
  ENTRIES_UPDATE,
  POST_IMAGE_TO_API_FAIL,
  POST_IMAGE_TO_API_SUCCESS,
  SET_IMAGE_BOX,
  SET_IMAGE_URL,
} from '../types';
import FrwaContext from './FrwaContext';
import FrwaReducer from './FrwaReducer';

// Create a custom hook to use the Frwa context
export const useFrwa = () => {
  const { state, dispatch } = useContext(FrwaContext);
  return [state, dispatch];
};

// Action creators
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Send Image to API
export const sendImage = async (dispatch, url) => {
  try {
    const { imageUrl } = url;
    dispatch({ type: SET_IMAGE_URL, payload: imageUrl });

    const res = await axios.post('https://frwa-server-v2.herokuapp.com/api/images', url, config);
    console.log(res);
    dispatch({
      type: POST_IMAGE_TO_API_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: POST_IMAGE_TO_API_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Update Image Entries of User
export const updateEntries = async (dispatch, id, imageUrl) => {
  try {
    const res = await axios.patch(
      `https://frwa-server-v2.herokuapp.com/api/images/${id}`,
      imageUrl,
      config
    );
    dispatch({
      type: ENTRIES_UPDATE,
      payload: res.data.entries,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ENTRIES_ERROR,
      payload: err.response.data.msg,
    });
  }
};

// Set FRWA Image Box Array
export const setImageBox = (dispatch, box) => {
  dispatch({
    type: SET_IMAGE_BOX,
    payload: box,
  });
};

// Clear FRWA State on logout or error
export const clearFrwa = (dispatch) => {
  dispatch({
    type: CLEAR_FRWA,
  });
};

const FrwaState = (props) => {
  const initialState = {
    imageUrl: null,
    box: null,
    boundingBox: null,
    updatedEntries: null,
    error: null,
  };

  const [state, dispatch] = useReducer(FrwaReducer, initialState);

  return (
    <FrwaContext.Provider
      value={{
        state: state,
        dispatch,
      }}
    >
      {props.children}
    </FrwaContext.Provider>
  );
};

export default FrwaState;
