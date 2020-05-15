import { createStore } from 'redux';
import reduser from './reducer'

export const store = createStore(reduser)