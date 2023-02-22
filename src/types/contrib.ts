export interface ContribState {
    contribs: any[];
    loading: boolean;
    error: null | string;
}

export enum ContribActionTypes {
    FETCH_CONTRIBS = 'FETCH_CONTRIBS',
    FETCH_CONTRIBS_SUCCESS = 'FETCH_CONTRIBS_SUCCESS',
    FETCH_CONTRIBS_ERROR = 'FETCH_CONTRIBS_ERROR',
}

interface FetchContribsAction {
    type: ContribActionTypes.FETCH_CONTRIBS;
}

interface FetchContribsSuccessAction {
    type: ContribActionTypes.FETCH_CONTRIBS_SUCCESS;
    payload: any[];
}

interface FetchContribsErrorAction {
    type: ContribActionTypes.FETCH_CONTRIBS_ERROR;
    payload: string;
}

export type ContribAction = FetchContribsAction | FetchContribsSuccessAction | FetchContribsErrorAction;
