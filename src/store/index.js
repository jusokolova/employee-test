import { configureStore } from '@reduxjs/toolkit';

export const initializeStore = (reducer) => configureStore({ reducer });
