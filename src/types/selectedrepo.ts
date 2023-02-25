export interface SelectedRepoState {
    selectedRepo: string;
}

export enum SelectedRepoActionTypes {
    SET_SELECTED_REPO = 'SET_SELECTED_REPO',
}

interface SetSelectedRepoAction {
    type: SelectedRepoActionTypes.SET_SELECTED_REPO;
    payload: string;
}

export type SelectedRepoAction = SetSelectedRepoAction;
