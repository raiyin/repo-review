import { GitHubUser } from "../types";
const SET_REVIEWER = "SET_REVIEWER";

const defaultState = {
    reviewer: {},
};

export function userReducer(state = defaultState, action: { type: string, payload: GitHubUser; }) {
    switch (action.type) {
        case SET_REVIEWER:
            return {
                ...state,
                reviewer: action.payload
            };
        default:
            return state;
    }
}

export const setReviewerAction = (payload: GitHubUser) => ({ type: SET_REVIEWER, payload });
