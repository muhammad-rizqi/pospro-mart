import {setAllocation} from '../redux/managerAction';
import store from '../redux/store';
import {apiPrivate} from './ApiServices';

export const getAllocationServices = async () => {
  const allocation = {loading: true, data: [], error: null};
  store.dispatch(setAllocation(allocation));
  apiPrivate()
    .get('/pengeluaran')
    .then((result) => {
      const {data} = result;
      allocation.data = data.data;
    })
    .catch((err) => {
      allocation.eror = err.message;
      console.log(err);
    })
    .finally(() => {
      allocation.loading = false;
      store.dispatch(setAllocation(allocation));
    });
};

export const addAllocationServices = (tipe, biaya) => {
  return apiPrivate().post('/pengeluaran', {
    tipe,
    biaya,
  });
};

export const updateAllocationServices = (id, tipe, biaya) => {
  return apiPrivate().post('/pengeluaran/' + id, {
    tipe,
    biaya,
  });
};

export const deleteAllocationServices = (id) => {
  return apiPrivate().delete('/pengeluaran/' + id);
};

export const getDailyReportServices = (from = null, to = null) => {
  const slug = from && to ? `?awal=${from}&akhir=${to}` : '';
  return apiPrivate().get('/laporan' + slug);
};

export const getAbsentServices = () => {
  return apiPrivate().get('/absent');
};
