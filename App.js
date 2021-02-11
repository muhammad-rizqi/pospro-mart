import React from 'react';
import {Provider} from 'react-redux';
import AppRouter from './src/routes/AppRouter';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
