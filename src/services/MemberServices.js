import {apiPrivate} from './ApiServices';

export const getBalanceServices = (id) => {
  return apiPrivate().get(`/member/${id}/saldo`);
};
