const SET_USER = "SET_USER";

const defaultState = {
    user_login: '',
};

export function userReducer(state = defaultState, action: { type: string, payload: string; }) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user_login: action.payload
            };
        default:
            return state;
    }
}

export const setUserAction = (payload: string) => ({ type: SET_USER, payload });
