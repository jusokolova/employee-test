import React from 'react';
import { Provider } from 'react-redux';

export function withReduxStore(store) {
  return (WrappedComponent) => (
    (props) => (
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    )
  );
}
