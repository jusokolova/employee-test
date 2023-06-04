import React from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import classNames from 'classnames/bind';

import { initializeStore } from 'store';
import { rootReducer } from 'store/reducers';
import { MainPage, Add, ROUTES, Edit } from 'pages';

import { withReduxStore } from 'hocs';

import styles from './styles.css';

const cx = classNames.bind(styles);

const App = () => (
  <BrowserRouter>
    <div className={cx('app')}>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.ADD} element={<Add />} />
        <Route path={ROUTES.EDIT} element={<Edit />} />
        <Route path="*" element={<Navigate to={ROUTES.MAIN} />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default withReduxStore(initializeStore(rootReducer))(App);
