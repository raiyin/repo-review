import { ContribAction, ContribActionTypes, ContribState } from '../../types/contrib';

const initialState: ContribState = {
    contribs: [],
    contribs_loading: false,
    contribs_error: null
};

export const contribReducer = (state = initialState, action: ContribAction): ContribState => {
    switch (action.type) {
        case ContribActionTypes.FETCH_CONTRIBS:
            return { contribs_loading: true, contribs_error: null, contribs: [] };
        case ContribActionTypes.FETCH_CONTRIBS_SUCCESS:
            return { contribs_loading: false, contribs_error: null, contribs: action.payload };
        case ContribActionTypes.FETCH_CONTRIBS_ERROR:
            return { contribs_loading: false, contribs_error: action.payload, contribs: [] };
        default:
            return state;
    }
};
