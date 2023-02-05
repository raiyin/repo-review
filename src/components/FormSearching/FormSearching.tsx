import React, { useState, useEffect } from 'react';
import BlackList from '../BlackList/BlackList';
import MyButton from '../ui/MyButton/MyButton';
import { useFetching } from '../../hooks/useFetching';
import cl from './FormSearching.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';
import GithubService from '../../api/GithubService';
import { Button, Input, AutoComplete } from 'antd';

export default function FormSearching() {
    const [btnText, setBtnText] = useState('Показать настройки');
    const [showOrHideSettings, setShowOrHideSettings] = useState(false);

    const [user, setUser] = useState('');

    const [repo, setRepo] = useState('');
    const [userRepos, setUserRepos] = useState<{ value: string; }[]>([]);
    const [repoOptions, setRepoOptions] = useState<{ value: string; }[]>([]);

    const [reviewer, setReviewer] = useState('');
    const [repoReviewers, setRepoReviewers] = useState<{ value: string; }[]>([]);
    const [blReviewersOptions, setBlReviewersOptions] = useState<{ value: string; }[]>([]);

    library.add(faGear);
    library.add(faUsers);

    const [fetchRepos, reposError] = useFetching(async (user: string) => {
        let response: string[];
        if (!user)
            response = [];
        else
            response = await GithubService.getUserRepos(user);

        let responseObj: Array<{ value: string; }> = response.map(item => ({ value: item }));
        setUserRepos(responseObj);
    });

    const [fetchReviewers, reviewrsError] = useFetching(async (repo: string) => {
        let response: string[];
        if (!repo)
            response = [];
        else
            response = await GithubService.getRepoContributors(user, repo);

        let responseObj: Array<{ value: string; }> = response.map(item => ({ value: item }));
        setUserRepos(responseObj);
    });

    useEffect(() => {
        fetchRepos(user);
    }, [user]);

    const onSearch = (searchText: string) => {
        setRepoOptions(
            !searchText ? [] : userRepos.filter((item: { value: string; }) => item.value.includes(searchText)),
        );
    };

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.currentTarget.value);
    };

    const onChange = (data: string) => {
        setRepo(data);
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
                        onSearch={onSearch}
                        onChange={onChange}
                        placeholder='Название репозитория' />
                    <AutoComplete
                        value={reviewer}
                        options={blReviewersOptions}
                        onSearch={onSearch}
                        onChange={onChange}
                        placeholder='В чёрный список' />
                    <BlackList />
                    <Input
                        value={reviewer}
                        onChange={() => { }}
                        type="text"
                        name='repo'
                        placeholder="Ревьюер" />
                    <MyButton onClick={() => { }} text='Сгенерировать' icon_type='users' />
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
