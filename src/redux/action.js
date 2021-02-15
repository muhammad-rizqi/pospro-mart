const changeToken = (data) => {
  return {
    type: 'CHANGE',
    data: data,
  };
};

const clearToken = () => {
  return {
    type: 'CLEAR',
  };
};

const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

export {changeToken, clearToken, setUser};
