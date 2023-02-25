import { BlacklistAction, BlacklistActionTypes, BlackListState } from '../../types/blacklist';

const initialState: BlackListState = {
    blacklisters: []
};

export const blacklistReducer = (state = initialState, action: BlacklistAction): BlackListState => {
    switch (action.type) {
        case BlacklistActionTypes.ADD_BLACKLIST_ITEM:
            if (!state.blacklisters.includes(action.payload)) {
                return { blacklisters: [...state.blacklisters, action.payload] };
            }
            return state;
        case BlacklistActionTypes.REMOVE_BLACKLIST_ITEM:
            return { blacklisters: state.blacklisters.filter(item => item.login != action.payload.login) };
        case BlacklistActionTypes.CLEAR_BLACKLIST:
            return { blacklisters: [] };
        default:
            return state;
    }
};
