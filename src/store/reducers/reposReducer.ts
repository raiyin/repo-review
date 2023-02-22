import { RepoAction, RepoActionTypes, RepoState } from '../../types/repo';

const initialState: RepoState = {
    repos: [],
    loading: false,
    error: null
};

export const repoReducer = (state = initialState, action: RepoAction): RepoState => {
    switch (action.type) {
        case RepoActionTypes.FETCH_REPOS:
            return { loading: true, error: null, repos: [] };
        case RepoActionTypes.FETCH_REPOS_SUCCESS:
            return { loading: false, error: null, repos: action.payload };
        case RepoActionTypes.FETCH_REPOS_ERROR:
            return { loading: false, error: action.payload, repos: [] };
        default:
            return state;
    }
};
