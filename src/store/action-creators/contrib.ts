import { ContribAction, ContribActionTypes } from "../../types/contrib";
import { Dispatch } from 'redux';
import { getRepoContributors } from "../../api/githubService";

export const fetchContribs = (user: string, repo: string) => {
    return async (dispatch: Dispatch<ContribAction>) => {
        try {
            dispatch({ type: ContribActionTypes.FETCH_CONTRIBS });
            const response_string = await getRepoContributors(user, repo);
            const response = response_string.map(item => ({ value: item.login, label: item.login, avatar_url: item.avatar_url }));
            dispatch({ type: ContribActionTypes.FETCH_CONTRIBS_SUCCESS, payload: response });
        } catch (e) {
            dispatch({
                type: ContribActionTypes.FETCH_CONTRIBS_ERROR,
                payload: 'При загрузке репозиториев произошла ошибка'
            });
        }
    };
};
