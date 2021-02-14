import {combineReducers} from 'redux';

const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.data;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'CHANGE_ID':
      return {
        ...state,
        id: action.data.id,
      };
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const staffState = {
  category: {loading: true, data: [], error: null},
  item: {loading: true, data: [], error: null},
  supplier: {loading: true, data: [], error: null},
  purchase: {loading: true, data: [], error: null},
};

const staffReducer = (state = staffState, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {...state, category: action.data};
    case 'SET_ITEM':
      return {...state, item: action.data};
    case 'SET_SUPPLIER':
      return {...state, supplier: action.data};
    case 'SET_PURCHASE':
      return {...state, purchase: action.data};
    default:
      return state;
  }
};

const penyetorState = {
  penyetoran: {loading: true, data: [], error: null},
  penjemputan: {loading: true, data: [], error: null},
};

const penyetorReducer = (state = penyetorState, action) => {
  switch (action.type) {
    case 'SET_DATA_PENJEMPUTAN':
      return {...state, penjemputan: action.data};
    case 'SET_DATA_PENYETORAN':
      return {...state, penyetoran: action.data};
    default:
      return state;
  }
};

const penjualState = {
  saldo: {loading: true, data: 0, error: false},
  penjualan: {loading: true, data: [], error: null},
  stok: {loading: true, data: [], error: null},
};

const penjualReducer = (state = penjualState, action) => {
  switch (action.type) {
    case 'SET_PENJUAL_SALDO':
      return {...state, saldo: action.data};
    case 'SET_PENJUALAN':
      return {...state, penjualan: action.data};
    case 'SET_STOK':
      return {...state, stok: action.data};
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
  staff: staffReducer,
  penyetor: penyetorReducer,
  penjual: penjualReducer,
});
