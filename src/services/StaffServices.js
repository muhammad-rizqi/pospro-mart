import {setCategory, setItems, setSupplier} from '../redux/staffAction';
import store from '../redux/store';
import {apiPrivate} from './ApiServices';

export const getCategoryServices = async () => {
  const category = {loading: true, data: [], error: null};
  store.dispatch(setCategory(category));
  apiPrivate()
    .get('/kategori')
    .then((result) => {
      const {data} = result;
      category.data = data.data;
    })
    .catch((err) => {
      category.eror = err.message;
      console.log(err);
    })
    .finally(() => {
      category.loading = false;
      store.dispatch(setCategory(category));
    });
};

export const getSupplierServices = async () => {
  const supplier = {loading: true, data: [], error: null};
  store.dispatch(setSupplier(supplier));
  apiPrivate()
    .get('/supplier')
    .then((result) => {
      const {data} = result;
      supplier.data = data.data;
    })
    .catch((err) => {
      supplier.eror = err.message;
      console.log(err);
    })
    .finally(() => {
      supplier.loading = false;
      store.dispatch(setSupplier(supplier));
    });
};

export const getItemServices = async () => {
  const item = {loading: true, data: [], error: null};
  store.dispatch(setItems(item));
  apiPrivate()
    .get('/barang')
    .then((result) => {
      const {data} = result;
      item.data = data.data;
    })
    .catch((err) => {
      item.eror = err.message;
      console.log(err);
    })
    .finally(() => {
      item.loading = false;
      store.dispatch(setItems(item));
    });
};

export const addItemServices = (
  nama,
  uid,
  harga_beli,
  harga_jual,
  kategori_id,
  merk,
  stok,
  diskon,
) => {
  return apiPrivate().post('/barang', {
    nama,
    uid,
    harga_beli,
    harga_jual,
    kategori_id,
    merk,
    stok,
    diskon,
  });
};

export const updateItemServices = (
  id,
  nama,
  uid,
  harga_beli,
  harga_jual,
  kategori_id,
  merk,
  stok,
  diskon,
) => {
  return apiPrivate().post('/barang/' + id, {
    nama,
    uid,
    harga_beli,
    harga_jual,
    kategori_id,
    merk,
    stok,
    diskon,
  });
};

export const deleteItemServices = (id) => {
  return apiPrivate().delete('/barang/' + id);
};

export const addCategoryServices = (nama) => {
  return apiPrivate().post('/kategori', {nama});
};

export const updateCategoryServices = (id, nama) => {
  return apiPrivate().post('/kategori/' + id, {nama});
};

export const deleteCategoryServices = (id) => {
  return apiPrivate().delete('/kategori/' + id);
};

export const addSupplierServices = (nama, alamat, no_hp) => {
  return apiPrivate().post('/supplier', {
    nama,
    alamat,
    no_hp,
  });
};

export const updateSupplierServices = (id, nama, alamat, no_hp) => {
  return apiPrivate().post('/supplier/' + id, {
    nama,
    alamat,
    no_hp,
  });
};

export const deleteSupplierServices = (id) => {
  return apiPrivate().delete('/supplier/' + id);
};
