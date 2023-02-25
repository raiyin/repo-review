import { ReviewerAction, ReviewerActionTypes, ReviewerState } from '../../types/reviewer';

const initialState: ReviewerState = {
    reviewer: null
};

export const reviewerReducer = (state = initialState, action: ReviewerAction): ReviewerState => {
    switch (action.type) {
        case ReviewerActionTypes.SET_REVIEWER:
            return { reviewer: action.payload };
        default:
            return state;
    }
};
