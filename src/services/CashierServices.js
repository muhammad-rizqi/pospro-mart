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

export const deleteSellingServices = () => {
  return apiPrivate().delete('/penjualan');
};

export const deleteCartServices = (id) => {
  return apiPrivate().delete('/penjualan/' + id);
};
