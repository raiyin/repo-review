import { MainUserAction, MainUserActionTypes, MainUserState } from '../../types/mainuser';

const initialState: MainUserState = {
    mainUser: ''
};

export const mainuserReducer = (state = initialState, action: MainUserAction): MainUserState => {
    switch (action.type) {
        case MainUserActionTypes.SET_MAINUSER:
            return { mainUser: action.payload };
        default:
            return state;
    }
};
