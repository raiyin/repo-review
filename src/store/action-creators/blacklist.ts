import { BlacklistAction, BlacklistActionTypes } from "../../types/blacklist";
import { Dispatch } from 'redux';
import { getRepoContributors } from "../../api/githubService";
import { GitHubUser } from "../../types";

export const addBlacklister = (user: GitHubUser) => {
    return async (dispatch: Dispatch<BlacklistAction>) => {
        dispatch({ type: BlacklistActionTypes.ADD_BLACKLIST_ITEM, payload: [] });
    };
};

export const removeBlacklister = (user: GitHubUser) => {
    return async (dispatch: Dispatch<BlacklistAction>) => {
        dispatch({ type: BlacklistActionTypes.REMOVE_BLACKLIST_ITEM, payload: [] });
    };
};
