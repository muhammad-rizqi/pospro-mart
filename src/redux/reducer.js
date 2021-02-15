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

const managerState = {
  allocation: {loading: true, data: [], error: null},
};

const managerReducer = (state = managerState, {type, data}) => {
  switch (type) {
    case 'SET_ALLOCATION':
      return {...state, allocation: data};
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
  staff: staffReducer,
  manager: managerReducer,
});
