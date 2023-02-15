import { createStore, combineReducers, applyMiddleware } from "redux";
import { useDispatch } from "react-redux";
import reposReducer from './reposReducer';
import { userReducer } from './userReducer';
import { contribsReducer } from "./contribsReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    user: userReducer,
    contribs: contribsReducer,
    repos: reposReducer,
});



export type IRootState = ReturnType<typeof rootReducer>;
const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

declare module "react-redux" {
    interface DefaultRootState extends RootState { }
}

export default store;
