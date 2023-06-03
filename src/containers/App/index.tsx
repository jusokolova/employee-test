import React from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';


import { initializeStore } from 'store';
import { rootReducer } from 'store/reducers';
import { MainPage, Add, ROUTES } from 'pages';

import { withReduxStore } from 'hocs';
import './styles.css';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.ADD} element={<Add />} />
        <Route path="*" element={<Navigate to={ROUTES.MAIN} />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default withReduxStore(initializeStore(rootReducer))(App);
