import { BlacklistAction, BlacklistActionTypes, BlackListState } from '../../types/blacklist';

const initialState: BlackListState = {
    blacklisters: []
};

export const blacklistReducer = (state = initialState, action: BlacklistAction): BlackListState => {
    switch (action.type) {
        case BlacklistActionTypes.ADD_BLACKLIST_ITEM:
            return { blacklisters: action.payload };
        case BlacklistActionTypes.REMOVE_BLACKLIST_ITEM:
            return { blacklisters: action.payload };
        default:
            return state;
    }
};
