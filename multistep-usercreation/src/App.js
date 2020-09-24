import React  from 'react';
import { Provider } from 'react-redux';
import Registration from './Modules/RegistrationSteps/Registration';
import store from './store/store';
import './App.css';


const App = () => {

  return (
    <Provider store={store}>
      <Registration/>
    </Provider>
  );
};


export default App;
