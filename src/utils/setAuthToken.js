import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    return (axios.defaults.headers.common['x-auth-token'] = token);
  }
  delete axios.defaults.headers.common['x-auth-token'];
  localStorage.removeItem('token');
};

export default setAuthToken;
