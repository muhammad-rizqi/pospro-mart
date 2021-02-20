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

export const getItemByBarcode = (barcode) => {
  return apiPrivate().get('/barang/uid/' + barcode);
};

export const getSellingServices = () => {
  return apiPrivate().get('/detailpenjualan/request');
};

export const confirmSellingServices = (dibayar = null, member_id = null) => {
  const data = {};
  dibayar ? (data.dibayar = dibayar) : null;
  member_id ? (data.member_id = member_id) : null;
  return apiPrivate().post('/detailpenjualan/confirm', data);
};

export const deleteCartServices = (id) => {
  return apiPrivate().delete('/penjualan/' + id);
};

export const getSelingHistory = () => {
  return apiPrivate().get('/penjualan/dibayar');
};

export const getMemberListServices = () => {
  return apiPrivate().get('/member');
};

export const getMemberByCode = (code) => {
  return apiPrivate().get('/member/kode_member/' + code);
};

export const topUpServices = (memberId, saldo) => {
  return apiPrivate().post(`/member/${memberId}/topup`, {saldo});
};

export const addMemberServices = (
  nama,
  email,
  no_hp,
  password,
  password_confirmation,
) => {
  return apiPrivate().post('/member', {
    nama,
    email,
    no_hp,
    password,
    password_confirmation,
  });
};
