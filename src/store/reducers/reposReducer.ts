import { RepoAction, RepoActionTypes, RepoState } from '../../types/repo';

const initialState: RepoState = {
    repos: [],
    repos_loading: false,
    repos_error: null
};

export const repoReducer = (state = initialState, action: RepoAction): RepoState => {
    switch (action.type) {
        case RepoActionTypes.FETCH_REPOS:
            return { repos_loading: true, repos_error: null, repos: [] };
        case RepoActionTypes.FETCH_REPOS_SUCCESS:
            return { repos_loading: false, repos_error: null, repos: action.payload };
        case RepoActionTypes.FETCH_REPOS_ERROR:
            return { repos_loading: false, repos_error: action.payload, repos: [] };
        default:
            return state;
    }
};
