import React, { useState, useEffect } from 'react';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, AutoComplete, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import MyButton from '../ui/MyButton/MyButton';
import UserList from '../UserList/UserList';
import UserListItem from '../UserListItem/UserListItem';
import { getRandomInt } from '../../api/utils';
import * as ls from '../../api/localstorageService';
import { getUserRepos, getRepoContributors } from '../../api/githubService';
import cl from './FormSearching.module.css';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { GitHubUser, IsPossibleAddToBL } from '../../types';

const FormSearching: React.FC = () => {

    const { mainUser } = useTypedSelector(state => state.mainuser);
    const { repos, repos_error, repos_loading } = useTypedSelector(state => state.repo);
    const { contribs, contribs_error, contribs_loading } = useTypedSelector(state => state.contrib);
    const { blacklisters } = useTypedSelector(state => state.blacklist);
    const { reviewer } = useTypedSelector(state => state.reviewer);

    const { setMainUser, fetchRepos, fetchContribs, addBlacklister, removeBlacklister, setReviewer } = useActions();

    const [btnText, setBtnText] = useState('Показать настройки');
    const [showOrHideSettings, setShowOrHideSettings] = useState(false);

    const [repo, setRepo] = useState('');
    const [repoOptions, setRepoOptions] = useState<{ value: string; }[]>([]);

    const [contrib, setContrib] = useState('');
    const [blContribsOptions, setBlContribsOptions] = useState<{ value: string; }[]>([]);

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

    useEffect(() => {
        let localUser = ls.getMainUser();
        if (localUser !== null) {
            setMainUser(localUser);
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
            tempArray.map(blacklister => addBlacklister(blacklister));
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
        if (!mainUser) {
            fetchRepos(mainUser);
        }
    }, [mainUser]);

    useEffect(() => {
        if (repos.filter(item => item.value === repo)) {
            const getContribsData = setTimeout(() => {
                fetchContribs(mainUser, repo);
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
        console.log(searchText);
        console.log(repos);
        console.log(repos[0]);
        setRepoOptions(
            !searchText ? [] : repos.filter(item => item.value.includes(searchText)),
        );
    };

    const onSearchContribs = (searchText: string) => {
        console.log(searchText);
        console.log(contribs);
        console.log(contribs[0]);
        setBlContribsOptions(
            !searchText ? [] : contribs.filter(item => item.value.includes(searchText))
        );
    };

    const onAddUserToBlackListHandler = () => {
        // Защищаем от добавления в чёрный список текущего пользователя.
        if (mainUser === contrib) {
            setContribAddPossible(IsPossibleAddToBL.NoCurrentUser);
            return;
        }

        // Защищаем от добавления в чёрный список несуществующего пользователя.
        if (contribs.filter(item => item.value === contrib).length === 0) {
            setContribAddPossible(IsPossibleAddToBL.NoNoexistUser);
            return;
        }

        // Защищаем от повторного добавления в чёрный список.
        if (blacklisters.filter(item => item.login === contrib).length !== 0) {
            setContribAddPossible(IsPossibleAddToBL.NoRepeat);
            return;
        }

        const newBlacklister = {
            login: contrib,
            avatar_url: contribs.filter(item => item.value === contrib)[0].avatar_url
        };

        addBlacklister(newBlacklister);
        ls.addUserToBlackList(newBlacklister.login, newBlacklister.avatar_url);
    };

    const removeBlItem = (blacklister: GitHubUser) => {
        removeBlacklister(blacklister);
        ls.removeUserFromBlackList(blacklister.login);
    };

    const onAddReviewerHandler = (e: React.MouseEvent) => {
        // Проверка возможности найти ревьюера.
        // Проверяем, чтобы список контрибьютеров с логинами, отличными от текущего пользователя
        // и которых нет в чёрном списке был не пустым.

        console.log('adonAddReviewerHandlerd');
        console.log(contribs);

        if (contribs.filter(
            item => (item.value != mainUser && blacklisters.filter(blItem => blItem.login === item.value).length === 0))
            .length === 0) {
            setReviewerAddPossible(false);
            return;
        }

        // Генерируем ревьюера.
        let timerId = setInterval(() => {
            let candidateIndex = getRandomInt(contribs.length);
            while (blacklisters.filter(item => item.login === contribs[candidateIndex].value).length !== 0) {
                candidateIndex = getRandomInt(contribs.length);
            }
            let candidate = contribs[candidateIndex];
            const newReviewer = {
                login: candidate.value,
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
        setMainUser(event.currentTarget.value);
        ls.setMainUser(event.currentTarget.value);
    };

    const onChangeRepoHandler = (repo_input: string) => {
        setRepo(repo_input);
        ls.setRepo(repo_input);
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
                        value={mainUser}
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
                        placeholder='Добавить в чёрный список' />

                    <Button onClick={onAddUserToBlackListHandler} disabled={contrib.length === 0}>Добавить в чёрный список</Button>
                    <UserList blItems={blacklisters} remove={removeBlItem}></UserList>
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
};

export default FormSearching;
