import React from 'react';
import './global.css';
import { Router } from 'react-router-dom';
import Routes from '../src/Routes/index';
import history from './history';

import { AuthProvider } from '../src/Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}


export default App;
