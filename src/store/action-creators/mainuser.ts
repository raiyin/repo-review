import { MainUserAction, MainUserActionTypes } from "../../types/mainuser";
import { Dispatch } from 'redux';

export const setMainUser = (user: string) => {
    return async (dispatch: Dispatch<MainUserAction>) => {
        dispatch({ type: MainUserActionTypes.SET_MAINUSER, payload: user });
    };
};
