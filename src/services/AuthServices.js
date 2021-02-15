import {clearToken} from '../redux/action';
import store from '../redux/store';
import {apiPublic} from './ApiServices';
import {removeToken} from './token/Token';

export const logout = () => {
  removeToken();
  store.dispatch(clearToken());
};

export const loginServices = (email, password, remember) => {
  return apiPublic.post('/login', {
    email,
    password,
    remember,
  });
};

export const registerServices = (
  nama,
  email,
  no_hp,
  password,
  password_confirmation,
) => {
  return apiPublic.post('/register', {
    nama,
    email,
    no_hp,
    password,
    password_confirmation,
  });
};

export const forgorPasswordServices = (email) => {
  return apiPublic.post('/password/email', {
    email,
  });
};

export const resetPasswordServices = (
  email,
  token,
  password,
  password_confirmation,
) => {
  return apiPublic.post('/password/reset', {
    email,
    token,
    password,
    password_confirmation,
  });
};
