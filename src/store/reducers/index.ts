import { combineReducers } from "redux";
import { repoReducer } from "./reposReducer";
import { contribReducer } from "./contribsReducer";
import { mainuserReducer } from './mainuserReducer';
import { reviewerReducer } from './reviewerReducer';
import { blacklistReducer } from "./blackListReducer";

export const rootReducer = combineReducers({
    mainuser: mainuserReducer,
    repo: repoReducer,
    contrib: contribReducer,
    blacklist: blacklistReducer,
    reviewer: reviewerReducer
});

export type RootState = ReturnType<typeof rootReducer>;
