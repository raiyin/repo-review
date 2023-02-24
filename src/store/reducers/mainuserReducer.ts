// const SET_USER = "SET_USER";

// const defaultState = {
//     user_login: '',
// };

// export function userReducer(state = defaultState, action: { type: string, payload: string; }) {
//     switch (action.type) {
//         case SET_USER:
//             return {
//                 ...state,
//                 user_login: action.payload
//             };
//         default:
//             return state;
//     }
// }

// export const setUserAction = (payload: string) => ({ type: SET_USER, payload });

/////////////////////
import { MainUserAction, MainUserActionTypes, MainUserState } from '../../types/mainuser';

const initialState: MainUserState = {
    mainUser: ''
};

export const mainuserReducer = (state = initialState, action: MainUserAction): MainUserState => {
    switch (action.type) {
        case MainUserActionTypes.SET_MAINUSER:
            return { mainUser: action.payload };
        case MainUserActionTypes.UNSET_MAINUSER:
            return { mainUser: '' };
        default:
            return state;
    }
};
