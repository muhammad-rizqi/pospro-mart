import {clearToken} from '../redux/action';
import store from '../redux/store';
import {apiPublic} from './ApiServices';
import {removeToken} from './token/Token';

const logout = () => {
  removeToken();
  store.dispatch(clearToken());
};

const loginServices = (email, password, remember) => {
  return apiPublic.post('/login', {
    email,
    password,
    remember,
  });
};

export {logout, loginServices};
