import React, { useState, useEffect } from 'react';
import BlackList from '../BlackList/BlackList';
import MyButton from '../ui/MyButton/MyButton';
import MyInput from '../ui/MyInput/MyInput';
import { useFetching } from '../../hooks/useFetching';
import cl from './FormSearching.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';
import GithubService from '../../api/GithubService';

interface Stats {
    total: number,
    count: number,
    average: number;
}

export default function FormSearching() {
    const [btnText, setBtnText] = useState('Показать настройки');
    const [showOrHideSettings, setShowOrHideSettings] = useState(false);
    const [user, setUser] = useState('');
    const [repo, setRepo] = useState('');
    const [reviewer, setReviewer] = useState('');


    const [fetchRepos, isReposLoading, reposError] = useFetching(async (user: string) => {
        const response = await GithubService.getUserRepos(user);
        console.log(response);
    });

    useEffect(() => {
        fetchRepos(user);
    }, []);

    library.add(faGear);
    library.add(faUsers);

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
            {showOrHideSettings ? (
                <>
                    <MyInput
                        value={user}
                        onChange={(e: Event) => setUser(e.target.value)}
                        type="text"
                        placeholder="Логин" />
                    <MyInput
                        value={repo}
                        onChange={(e) => setUser(e.target.value)}
                        type="text"
                        placeholder="Название репозитория" />
                    <BlackList />
                    <MyInput
                        value={reviewer}
                        onChange={(e) => setUser({ e.target.value })}
                        type="text"
                        placeholder="Ревьюер появится здесь" />
                    <MyButton onClick={() => { }} text='Сгенерировать' icon_type='users' />
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
