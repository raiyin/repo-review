export interface MainUserState {
    mainUser: string;
}

export enum MainUserActionTypes {
    SET_MAINUSER = 'SET_MAINUSER',
    UNSET_MAINUSER = 'UNSET_MAINUSER',
}

interface SetMainUserAction {
    type: MainUserActionTypes.SET_MAINUSER;
    payload: string;
}

interface UnsetMainUserAction {
    type: MainUserActionTypes.UNSET_MAINUSER;
}

export type MainUserAction = SetMainUserAction | UnsetMainUserAction;
