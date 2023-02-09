import React, { useState, useEffect } from 'react';
import MyButton from '../ui/MyButton/MyButton';
import { useFetching } from '../../hooks/useFetching';
import cl from './FormSearching.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';
import { GitHubContribObject, getUserRepos, getRepoContributors } from '../../api/githubService';
import { Button, Input, AutoComplete } from 'antd';
import UserList from '../UserList/UserList';
import UserListItem from '../UserListItem/UserListItem';
import { getRandomInt } from '../../api/utils';
import * as ls from '../../api/localstorageService';

export default function FormSearching() {
    const [btnText, setBtnText] = useState('Показать настройки');
    const [showOrHideSettings, setShowOrHideSettings] = useState(false);

    const [user, setUser] = useState('');

    const [repo, setRepo] = useState('');
    const [userRepos, setUserRepos] = useState<{ value: string; }[]>([]);
    const [repoOptions, setRepoOptions] = useState<{ value: string; }[]>([]);

    const [contrib, setContrib] = useState('');
    const [repoContribs, setRepoContribs] = useState<Array<GitHubContribObject>>([]);
    const [blContribsOptions, setBlContribsOptions] = useState<{ value: string; }[]>([]);

    const [blItems, setBlItems] = useState<Array<GitHubContribObject>>([]);
    const [reviewer, setReviewer] = useState<GitHubContribObject | null>(null);

    library.add(faGear);
    library.add(faUsers);

    const [fetchRepos] = useFetching(async (user: string) => {
        let response: string[];
        if (!user)
            response = [];
        else
            response = await getUserRepos(user);

        let responseObj: Array<{ value: string; }> = response.map(item => ({ value: item }));
        setUserRepos(responseObj);
    });

    const [fetchContribs] = useFetching(async (user: string, repo: string) => {
        let response: GitHubContribObject[];
        if (!repo || !user)
            response = [];
        else
            response = await getRepoContributors(user, repo);
        setRepoContribs(response);
    });

    useEffect(() => {
        let localUser = ls.getMainUser();
        if (localUser !== null) {
            setUser(localUser);
        }
    }, []);

    useEffect(() => {
        let localRepo = ls.getRepo();
        if (localRepo !== null) {
            setRepo(localRepo);
        }
    }, []);

    useEffect(() => {
        let localBlackList = ls.getAllUsersFromBlackList();
        if (localBlackList !== null) {
            let tempArray = localBlackList.map(item => ({ 'login': item.login, 'avatar_url': item.avatar_url }));
            setBlItems(tempArray);
        }
    }, []);

    useEffect(() => {
        let localReviewer = ls.getReviewer();
        if (localReviewer !== null) {
            const newReviewer = {
                login: localReviewer.login,
                avatar_url: localReviewer.avatar_url
            };
            setReviewer(newReviewer);
        }
    }, []);

    useEffect(() => {
        setRepoContribs([]);

        const getReposData = setTimeout(() => {
            fetchRepos(user);
        }, 500);

        return () => clearTimeout(getReposData);

    }, [user]);

    useEffect(() => {
        if (userRepos.filter((item: { value: string; }) => item.value === repo)) {
            const getContribsData = setTimeout(() => {
                fetchContribs(user, repo);
            }, 500);

            return () => clearTimeout(getContribsData);
        }
    }, [repo]);

    const onSearchRepos = (searchText: string) => {
        setRepoOptions(
            !searchText ? [] : userRepos.filter((item: { value: string; }) => item.value.includes(searchText)),
        );
    };

    const onSearchContribs = (searchText: string) => {
        setBlContribsOptions(
            !searchText ? [] : repoContribs.filter((item: GitHubContribObject) => item.login.includes(searchText)).map(item => ({ value: item.login })),
        );
    };

    const AddUserToBlackList = () => {
        // Защищаем от повторного добавления в чёрный список.
        if (blItems.filter(item => item.login === contrib).length === 0) {
            const newBlItem = {
                login: contrib,
                avatar_url: repoContribs.filter(item => item.login === contrib)[0].avatar_url
            };
            setBlItems([...blItems, newBlItem]);
            ls.addUserToBlackList(newBlItem.login, newBlItem.avatar_url);
        }
    };

    const removeBlItem = (blItem: GitHubContribObject) => {
        setBlItems(blItems.filter(item => item.login !== blItem.login));
        ls.removeUserFromBlackList(blItem.login);
    };

    const AddReviewer = (e: React.MouseEvent) => {
        // Генерируем ревьюера.
        let candidateIndex = getRandomInt(repoContribs.length);
        while (blItems.filter(item => item.login === repoContribs[candidateIndex].login).length !== 0) {
            candidateIndex = getRandomInt(repoContribs.length);
        }
        let candidate = repoContribs[candidateIndex];
        const newReviewer = {
            login: candidate.login,
            avatar_url: candidate.avatar_url
        };
        setReviewer(newReviewer);
        ls.setReviewer(newReviewer.login, newReviewer.avatar_url);
    };

    const removeReviewer = () => {
        setReviewer(null);
        ls.removeReviewer();
    };

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.currentTarget.value);
        ls.setMainUser(event.currentTarget.value);
    };

    const onChangeRepo = (repo: string) => {
        setRepo(repo);
        ls.setRepo(repo);
    };

    const onChangeContrib = (contributor: string) => {
        setContrib(contributor);
    };

    const changeVision = () => {
        setShowOrHideSettings(!showOrHideSettings);
        setBtnText(showOrHideSettings ? 'Показать настройки' : 'Скрыть настройки');
    };

    return (
        <div className={cl.formsearching}>
            <MyButton onClick={changeVision} text={btnText} icon_type='gear' />

            {showOrHideSettings ? (
                <>
                    <Input
                        value={user}
                        onChange={changeLogin}
                        type='text'
                        name='login'
                        placeholder='Логин' />

                    <AutoComplete
                        value={repo}
                        options={repoOptions}
                        onSearch={onSearchRepos}
                        onChange={onChangeRepo}
                        placeholder='Название репозитория' />

                    <AutoComplete
                        value={contrib}
                        options={blContribsOptions}
                        onSearch={onSearchContribs}
                        onChange={onChangeContrib}
                        placeholder='В чёрный список' />

                    <Button onClick={AddUserToBlackList}>Добавить в чёрный список</Button>
                    <UserList blItems={blItems} remove={removeBlItem}></UserList>
                    <Button onClick={AddReviewer} >Генерировать ревьюера</Button>

                    {reviewer !== null ?
                        (<UserListItem key={reviewer.login} remove={removeReviewer} blItem={reviewer} />)
                        :
                        (<></>)
                    }
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
