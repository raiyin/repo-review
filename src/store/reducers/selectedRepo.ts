import { SelectedRepoAction, SelectedRepoActionTypes, SelectedRepoState } from '../../types/selectedrepo';

const initialState: SelectedRepoState = {
    selectedRepo: ''
};

export const selectedRepoReducer = (state = initialState, action: SelectedRepoAction): SelectedRepoState => {
    switch (action.type) {
        case SelectedRepoActionTypes.SET_SELECTED_REPO:
            return { selectedRepo: action.payload };
        default:
            return state;
    }
};
