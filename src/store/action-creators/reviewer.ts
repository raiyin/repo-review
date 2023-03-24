import { ReviewerAction, ReviewerActionTypes } from "../../types/reviewer";
import { Dispatch } from 'redux';
import { GitHubUser } from "../../types";

export const setReviewer = (reviewer: GitHubUser | null) => {
    return async (dispatch: Dispatch<ReviewerAction>) => {
        dispatch({ type: ReviewerActionTypes.SET_REVIEWER, payload: reviewer });
    };
};
