import { GitHubUser } from "./types";

const ADD_BLACKLISTER = 'ADD_BLACKLISTER';
const REMOVE_BLACKLISTER = 'REMOVE_BLACKLISTER';

const defaultState = {
    blacklisters: Array<GitHubUser>()
};

export function contribsReducer(state = defaultState, action: { type: string, payload: GitHubUser; }) {
    switch (action.type) {
        case ADD_BLACKLISTER:
            return {
                ...state,
                blacklisters: [...state.blacklisters, action.payload]
            };
        case REMOVE_BLACKLISTER:
            return {
                ...state,
                blacklisters: state.blacklisters.filter(blItem => blItem.login !== action.payload.login)
            };
        default:
            return state;
    }
}

export const addBlacklisterAction = (payload: GitHubUser) => ({ type: ADD_BLACKLISTER, payload });
export const removeBlacklisterAction = (payload: GitHubUser) => ({ type: REMOVE_BLACKLISTER, payload });
