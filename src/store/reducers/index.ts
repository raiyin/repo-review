import { combineReducers } from "redux";
import { repoReducer } from "./reposReducer";

export const rootReducer = combineReducers({
    repo: repoReducer
});

export type RootState = ReturnType<typeof rootReducer>;
