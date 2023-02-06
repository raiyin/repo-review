import React, { useState, useEffect } from 'react';
import MyButton from '../ui/MyButton/MyButton';
import { useFetching } from '../../hooks/useFetching';
import cl from './FormSearching.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';
import { GithubService, GitHubContribObject } from '../../api/GithubService';
import { Button, Input, AutoComplete } from 'antd';
import BlackListItem from '../BlackListItem/BlackListItem';

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

    const [fetchContribs, reviewrsError] = useFetching(async (user: string, repo: string) => {
        let response: GitHubContribObject[];
        if (!repo || !user)
            response = [];
        else
            response = await GithubService.getRepoContributors(user, repo);

        // let responseObj: Array<GitHubContribObject> = response.map(item => ({ value: item }));
        // setRepoContribs(responseObj);
        //let responseObj: Array<GitHubContribObject> = response.map(item => ({ value: item }));
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


                    <Button>Добавить в чёрный список</Button>
                    <BlackListItem login='Pixi' img='https://randomuser.me/api/portraits/men/33.jpg' />
                    <Input
                        // value={}
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
