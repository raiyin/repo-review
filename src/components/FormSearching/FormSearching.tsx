import React, { useState, useEffect } from 'react';
import MyButton from '../ui/MyButton/MyButton';
import { useFetching } from '../../hooks/useFetching';
import cl from './FormSearching.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';
import { GitHubContribObject, getUserRepos, getRepoContributors } from '../../api/githubService';
import { Button, Input, AutoComplete, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import UserList from '../UserList/UserList';
import UserListItem from '../UserListItem/UserListItem';
import { getRandomInt } from '../../api/utils';
import * as ls from '../../api/localstorageService';

enum IsPossibleAddToBL {
    Yes = 1,
    NoCurrentUser,
    NoRepeat,
    NoNoexistUser,
    NoEmptyString
}

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

    const [reviewerAddPossible, setReviewerAddPossible] = useState(true);
    const [contribAddPossible, setContribAddPossible] = useState<IsPossibleAddToBL>(IsPossibleAddToBL.Yes);

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement, title: string, message: string) => {
        api.info({
            message: title,
            description: message,
            placement,
        });
    };

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

    useEffect(() => {
        if (!reviewerAddPossible) {
            openNotification('top',
                'Добавление ревьюера невозможно',
                'При выбранных параметрах добавление ревьюера невозможно. Возможно, что у репозитория один контрибьютор или почти все они в чёрном списке.');
            setReviewerAddPossible(true);
        }
        else if (contribAddPossible === IsPossibleAddToBL.NoCurrentUser) {
            openNotification('top',
                'Добавление в чёрный список невозможно',
                'Запрещено добавлять текущего пользователя в чёрный список.');
            setContribAddPossible(IsPossibleAddToBL.Yes);
        }
        else if (contribAddPossible === IsPossibleAddToBL.NoNoexistUser) {
            openNotification('top',
                'Добавление в чёрный список невозможно',
                'Запрещено добавлять несуществующего пользователя в чёрный список.');
            setContribAddPossible(IsPossibleAddToBL.Yes);
        }
        else if (contribAddPossible === IsPossibleAddToBL.NoRepeat) {
            openNotification('top',
                'Добавление в чёрный список невозможно',
                'Запрещено добавлять пользователя в чёрный список повторно.');
            setContribAddPossible(IsPossibleAddToBL.Yes);
        }
    }, [reviewerAddPossible, contribAddPossible]);

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

    const onAddUserToBlackListHandler = () => {
        // Защищаем от добавления в чёрный список текущего пользователя.
        if (user === contrib) {
            setContribAddPossible(IsPossibleAddToBL.NoCurrentUser);
            return;
        }

        // Защищаем от добавления в чёрный список несуществующего пользователя.
        if (repoContribs.filter(item => item.login === contrib).length === 0) {
            setContribAddPossible(IsPossibleAddToBL.NoNoexistUser);
            return;
        }

        // Защищаем от повторного добавления в чёрный список.
        if (blItems.filter(item => item.login === contrib).length !== 0) {
            setContribAddPossible(IsPossibleAddToBL.NoRepeat);
            return;
        }

        const newBlItem = {
            login: contrib,
            avatar_url: repoContribs.filter(item => item.login === contrib)[0].avatar_url
        };
        setBlItems([...blItems, newBlItem]);
        ls.addUserToBlackList(newBlItem.login, newBlItem.avatar_url);
    };

    const removeBlItem = (blItem: GitHubContribObject) => {
        setBlItems(blItems.filter(item => item.login !== blItem.login));
        ls.removeUserFromBlackList(blItem.login);
    };

    const onAddReviewerHandler = (e: React.MouseEvent) => {
        // Проверка возможности найти ревьюера.
        // Проверяем, чтобы список контрибьютеров с логинами, отличными от текущего пользователя
        // и которых нет в чёрном списке был не пустым.
        if (repoContribs.filter(
            item => (item.login != user && blItems.filter(blItem => blItem.login === item.login).length === 0))
            .length === 0) {
            setReviewerAddPossible(false);
            return;
        }

        // Генерируем ревьюера.
        let timerId = setInterval(() => {
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

        }, 1000);

        setTimeout(() => { clearInterval(timerId); }, 5000);
    };

    const removeReviewer = () => {
        setReviewer(null);
        ls.removeReviewer();
    };

    const onChangeUserHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.currentTarget.value);
        ls.setMainUser(event.currentTarget.value);
    };

    const onChangeRepoHandler = (repo: string) => {
        setRepo(repo);
        ls.setRepo(repo);
    };

    const onChangeContribHandler = (contributor: string) => {
        setContrib(contributor);
    };

    const onChangeVisionHandler = () => {
        setShowOrHideSettings(!showOrHideSettings);
        setBtnText(showOrHideSettings ? 'Показать настройки' : 'Скрыть настройки');
    };

    return (
        <div className={cl.formsearching}>

            {contextHolder}
            <MyButton onClick={onChangeVisionHandler} text={btnText} icon_type='gear' />

            {showOrHideSettings ? (
                <>
                    <Input
                        value={user}
                        onChange={onChangeUserHandler}
                        type='text'
                        name='login'
                        placeholder='Логин' />

                    <AutoComplete
                        value={repo}
                        options={repoOptions}
                        onSearch={onSearchRepos}
                        onChange={onChangeRepoHandler}
                        placeholder='Название репозитория' />

                    <AutoComplete
                        value={contrib}
                        options={blContribsOptions}
                        onSearch={onSearchContribs}
                        onChange={onChangeContribHandler}
                        placeholder='В чёрный список' />

                    <Button onClick={onAddUserToBlackListHandler} disabled={contrib.length === 0}>Добавить в чёрный список</Button>
                    <UserList blItems={blItems} remove={removeBlItem}></UserList>
                    <Button onClick={onAddReviewerHandler} >Генерировать ревьюера</Button>

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
