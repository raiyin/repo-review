import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

//export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
