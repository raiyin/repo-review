export interface RepoState {
    repos: any[];
    loading: boolean;
    error: null | string;
}

export enum RepoActionTypes {
    FETCH_REPOS = 'FETCH_REPOS',
    FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS',
    FETCH_REPOS_ERROR = 'FETCH_REPOS_ERROR',
}

interface FetchReposAction {
    type: RepoActionTypes.FETCH_REPOS;
}

interface FetchReposSuccessAction {
    type: RepoActionTypes.FETCH_REPOS_SUCCESS;
    payload: any[];
}

interface FetchReposErrorAction {
    type: RepoActionTypes.FETCH_REPOS_ERROR;
    payload: string;
}

export type RepoAction = FetchReposAction | FetchReposSuccessAction | FetchReposErrorAction;
