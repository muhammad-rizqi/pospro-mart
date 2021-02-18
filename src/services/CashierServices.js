import {apiPrivate} from './ApiServices';

export const addSellingServices = (barang_id, jumlah_barang) => {
  return apiPrivate().post('/penjualan', {
    barang_id,
    jumlah_barang,
  });
};

export const updateSellingServices = (cartId, jumlah_barang) => {
  return apiPrivate().post('/penjualan/' + cartId, {
    jumlah_barang,
  });
};

export const searchItemServices = (name) => {
  return apiPrivate().get('/barang/search/' + name);
};

export const getSellingServices = () => {
  return apiPrivate().get('/detailpenjualan/request');
};

export const confirmSellingServices = (dibayar, member_id = null) => {
  const data = {dibayar};
  member_id ? (data.member_id = member_id) : null;
  return apiPrivate().post('/detailpenjualan/confirm', data);
};

export const deleteCartServices = (id) => {
  return apiPrivate().delete('/penjualan/' + id);
};

export const getSelingHistory = () => {
  return apiPrivate().get('/penjualan/dibayar');
};
