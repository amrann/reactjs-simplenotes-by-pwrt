import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduser from './reducer';

export const store = createStore(reduser, applyMiddleware(thunk))