import {clearToken} from '../redux/action';
import store from '../redux/store';

export const logout = () => {
  store.dispatch(clearToken());
};
