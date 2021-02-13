import {setUser} from '../redux/action';
import store from '../redux/store';
import {apiPrivate} from './ApiServices';

export const getProfileServices = async (onFinished, onError) => {
  try {
    const {data} = await apiPrivate().get('/profil');
    store.dispatch(setUser(data.data));
  } catch (error) {
    console.log('error get profile');
    onError(error);
  } finally {
    onFinished();
  }
};
