import { combineReducers } from "redux";
import { repoReducer } from "./reposReducer";
import { contribReducer } from "./contribsReducer";
import { selectedRepoReducer } from './selectedRepo';
import { mainuserReducer } from './mainuserReducer';
import { reviewerReducer } from './reviewerReducer';
import { blacklistReducer } from "./blackListReducer";

export const rootReducer = combineReducers({
    mainuser: mainuserReducer,
    repo: repoReducer,
    contrib: contribReducer,
    selectedRepo: selectedRepoReducer,
    blacklist: blacklistReducer,
    reviewer: reviewerReducer
});

export type RootState = ReturnType<typeof rootReducer>;
