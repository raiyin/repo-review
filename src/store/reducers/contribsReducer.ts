import { GitHubUser } from "../types";
const SET_CONTRIBS = "SET_REPOS";

const defaultState = {
    contribs: Array<GitHubUser>()
};

export function contribsReducer(state = defaultState, action: { type: string, payload: Array<GitHubUser>; }) {
    switch (action.type) {
        case SET_CONTRIBS:
            return {
                ...state,
                contribs: action.payload
            };
        default:
            return state;
    }
}

export const setContribsAction = (payload: Array<GitHubUser>) => ({ type: SET_CONTRIBS, payload });
