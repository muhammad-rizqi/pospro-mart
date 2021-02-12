import {setUser} from '../redux/action';
import store from '../redux/store';
import {apiPrivate} from './ApiServices';

export const getProfileServices = async () => {
  try {
    const {data} = await apiPrivate().get('/profil');
    console.log(data);
    store.dispatch(setUser(data.data));
  } catch (error) {
    console.log('error get profile');
    console.log(error);
  }
};
