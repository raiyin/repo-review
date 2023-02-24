import { combineReducers } from "redux";
import { repoReducer } from "./reposReducer";
import { contribReducer } from "./contribsReducer";
import { mainuserReducer } from './mainuserReducer';

export const rootReducer = combineReducers({
    repo: repoReducer,
    contrib: contribReducer,
    mainuser: mainuserReducer
});

export type RootState = ReturnType<typeof rootReducer>;
