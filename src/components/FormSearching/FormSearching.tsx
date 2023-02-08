import React, { useState, useEffect } from 'react';
import MyButton from '../ui/MyButton/MyButton';
import { useFetching } from '../../hooks/useFetching';
import cl from './FormSearching.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';
import { GitHubContribObject, getUserRepos, getRepoContributors } from '../../api/GithubService';
import { Button, Input, AutoComplete } from 'antd';
import UserList from '../UserList/UserList';

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

    const [blItem, setBlItem] = useState<GitHubContribObject>({ login: '', avatar_url: '' });
    const [blItems, setBlItems] = useState<Array<GitHubContribObject>>([]);


    const [reviewers, setReviewers] = useState<Array<GitHubContribObject>>([]);

    library.add(faGear);
    library.add(faUsers);

    const [fetchRepos, reposError] = useFetching(async (user: string) => {
        let response: string[];
        if (!user)
            response = [];
        else
            response = await getUserRepos(user);

        let responseObj: Array<{ value: string; }> = response.map(item => ({ value: item }));
        setUserRepos(responseObj);
    });

    const [fetchContribs, reviewrsError] = useFetching(async (user: string, repo: string) => {
        let response: GitHubContribObject[];
        if (!repo || !user)
            response = [];
        else
            response = await getRepoContributors(user, repo);
        setRepoContribs(response);

        console.log(response);
    });

    useEffect(() => {
        fetchRepos(user);
    }, [user]);

    useEffect(() => {
        if (userRepos.filter((item: { value: string; }) => item.value === repo)) {
            fetchContribs(user, repo);
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

    const AddUserToBlackList = (e: React.MouseEvent) => {
        // Защищаем от повторного добавления в чёрный список.
        if (blItems.filter(item => item.login == contrib).length === 0) {
            const newBlItem = {
                login: contrib,
                avatar_url: repoContribs.filter(item => item.login === contrib)[0].avatar_url
            };
            createBlItem(newBlItem);
        }
    };

    const removeBlItem = (blItem: GitHubContribObject) => {
        setBlItems(blItems.filter(item => item.login !== blItem.login));
    };

    const createBlItem = (newBlItem: GitHubContribObject) => {
        setBlItems([...blItems, newBlItem]);
    };

    const AddReviewer = (e: React.MouseEvent) => {
        if (reviewers.length === 0) {
            const newReviewer = {
                login: contrib,
                avatar_url: repoContribs.filter(item => item.login === contrib)[0].avatar_url
            };
            createReviewer(newReviewer);
        }
    };

    const createReviewer = (newReviewer: GitHubContribObject) => {
        setReviewers([...reviewers, newReviewer]);
    };

    const removeReviewer = (reviewer: GitHubContribObject) => {
        setReviewers(reviewers.filter(item => item.login !== reviewer.login));
    };

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.currentTarget.value);
    };

    const onChangeRepo = (data: string) => {
        setRepo(data);
    };

    const onChangeContrib = (data: string) => {
        setContrib(data);
    };

    function changeVisibility() {
        setBtnText(showOrHideSettings ? 'Показать настройки' : 'Скрыть настройки');
    }

    const changeVision = () => {
        setShowOrHideSettings(!showOrHideSettings);
        changeVisibility();
    };

    return (
        <div className={cl.formsearching}>
            <MyButton onClick={changeVision} text={btnText} icon_type='gear' />

            <datalist id="countriesList"></datalist>
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
                    <Button onClick={AddReviewer} >Сгенерировать</Button>
                    <UserList blItems={reviewers} remove={removeReviewer}></UserList>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
