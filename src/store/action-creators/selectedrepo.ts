import { SelectedRepoAction, SelectedRepoActionTypes } from '../../types/selectedrepo';
import { Dispatch } from 'redux';

export const setSelectedRepo = (selectedRepo: string) => {
    return async (dispatch: Dispatch<SelectedRepoAction>) => {
        dispatch({ type: SelectedRepoActionTypes.SET_SELECTED_REPO, payload: selectedRepo });
    };
};
