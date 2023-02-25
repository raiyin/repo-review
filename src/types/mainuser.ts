export interface MainUserState {
    mainUser: string;
}

export enum MainUserActionTypes {
    SET_MAINUSER = 'SET_MAINUSER',
}

interface SetMainUserAction {
    type: MainUserActionTypes.SET_MAINUSER;
    payload: string;
}

export type MainUserAction = SetMainUserAction;
