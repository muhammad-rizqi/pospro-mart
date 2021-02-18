import axios from 'axios';
import {setUser} from '../redux/action';
import store from '../redux/store';
import {apiPrivate, HOST, getReduxToken} from './ApiServices';

export const getProfileServices = async (onFinished, onError) => {
  try {
    const {data} = await apiPrivate().get('/profil');
    store.dispatch(setUser(data.data));
  } catch (error) {
    console.log('error get profile');
    console.log(error.response);
    onError(error);
  } finally {
    onFinished();
  }
};

export const updateProfileServices = (
  foto = null,
  nama,
  email,
  no_hp,
  umur,
  alamat,
) => {
  const body = {
    nama,
    no_hp,
    umur,
    alamat,
  };

  email ? (body.email = email) : null;

  if (foto) {
    const data = new FormData();
    data.append('foto', {
      name: foto.fileName,
      type: foto.type,
      uri: foto.uri,
    });
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return axios.post(HOST + '/api/profil', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + getReduxToken(),
      },
    });
  } else {
    return apiPrivate().post('/profil', body);
  }
};

export const changePasswordServices = (password, password_confirmation) => {
  return apiPrivate().post('/profil/password', {
    password,
    password_confirmation,
  });
};

export const deleteAccountServices = () => {
  return apiPrivate().delete('/profil');
};
