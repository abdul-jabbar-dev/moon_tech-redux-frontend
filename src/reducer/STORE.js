import { composeWithDevTools } from '@redux-devtools/extension';
import {createStore} from 'redux'
import ROOT_REDUCER from './rootReducer';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
 
const STORE = createStore(ROOT_REDUCER, composeWithDevTools(applyMiddleware(thunk)))
export{  STORE}