import { Reducer, Action } from "redux";

const SET_REPOS = "SET_REPOS";

interface Repos {
    repos: Array<string>;
}

interface SetReposAction
    extends Action<typeof SET_REPOS> {
    payload: Repos;
}

const reposReducer: Reducer<Array<string>, SetReposAction> = (state = [], { type, payload }) => {
    switch (type) {
        case SET_REPOS:
            return {
                ...state,
                repos: [...payload.repos]
            };
        default:
            return state;
    }
};

export const setReposAction = (payload: Array<string>) => ({ type: SET_REPOS, payload });
export default reposReducer;
