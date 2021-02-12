import axios from 'axios';
import store from '../redux/store';

const apiPublic = axios.create({
  baseURL: 'https://pospondokprogrammer.herokuapp.com/api/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getReduxToken = () => {
  const {token} = store.getState();
  console.log(store.getState());
  return token;
};

const apiPrivate = () => {
  return axios.create({
    baseURL: 'https://pospondokprogrammer.herokuapp.com/api/',
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + getReduxToken(),
    },
  });
};

export {apiPublic, apiPrivate};
