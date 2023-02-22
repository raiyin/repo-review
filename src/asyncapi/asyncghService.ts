import { AnyAction, Dispatch } from "redux";
import { setReposAction } from "../store/reducers/reposReducer";
import { RootState } from "../store";

export type FetchReposFromGithub = (
    dispatch: Dispatch,
    getState: () => RootState
) => Promise<void>;


export type FetchRepos = (userName: string) => FetchReposFromGithub;

const fetchRepos: FetchRepos = (username: string) => {
    const fetchUser = (dispatch: Dispatch, getState: () => RootState) => {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then((response) => response.json())
            .then((data) => {
                dispatch(setReposAction(data));
            });
    };
    return fetchUser;
};

export default fetchRepos;
