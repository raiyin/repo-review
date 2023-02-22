import { ContribAction, ContribActionTypes, ContribState } from ''../../types / contrib';;

const initialState: ContribState = {
    contribs: [],
    loading: false,
    error: null
};

export const contribReducer = (state = initialState, action: ContribAction): ContribState => {
    switch (action.type) {
        case ContribActionTypes.FETCH_CONTRIBS:
            return { loading: true, error: null, contribs: [] };
        case ContribActionTypes.FETCH_CONTRIBS_SUCCESS:
            return { loading: false, error: null, contribs: action.payload };
        case ContribActionTypes.FETCH_CONTRIBS_ERROR:
            return { loading: false, error: action.payload, contribs: [] };
        default:
            return state;
    }
};
