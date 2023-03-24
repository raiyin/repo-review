import { RepoAction, RepoActionTypes } from "../../types/repo";
import { Dispatch } from 'redux';
import { getUserRepos } from "../../api/githubService";

export const fetchRepos = (user: string) => {
    return async (dispatch: Dispatch<RepoAction>) => {
        try {
            dispatch({ type: RepoActionTypes.FETCH_REPOS });
            const response_string = await getUserRepos(user);
            const response = response_string.map(item => ({ value: item, label: item }));
            dispatch({ type: RepoActionTypes.FETCH_REPOS_SUCCESS, payload: response });
        } catch (e) {
            dispatch({
                type: RepoActionTypes.FETCH_REPOS_ERROR,
                payload: 'При загрузке репозиториев произошла ошибка'
            });
        }
    };
};
