import { GitHubUser } from '../types';

export interface ReviewerState {
    reviewer: GitHubUser | null;
}

export enum ReviewerActionTypes {
    SET_REVIEWER = 'SET_REVIEWER',
}

interface SetReviewerAction {
    type: ReviewerActionTypes.SET_REVIEWER;
    payload: GitHubUser | null;
}


export type ReviewerAction = SetReviewerAction;
