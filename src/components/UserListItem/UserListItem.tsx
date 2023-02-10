import React from 'react';
import MyButton from '../ui/MyButton/MyButton';
import cl from './UserListItem.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { GitHubContribObject } from '../../api/githubService';

interface BlackListItem {
    blItem: GitHubContribObject;
    remove: Function;
}

const BlackList: React.FC<BlackListItem> = ({ blItem, remove }) => {

    library.add(faXmark);
    return (
        <div className={cl.leaderboard__profile}>
            <img src={blItem.avatar_url} alt={blItem.login} className={cl.leaderboard__picture} />
            <span className={cl.leaderboard__name}>{blItem.login}</span>
            <MyButton text='' onClick={() => remove(blItem)} icon_type='xmark' />
        </div>

    );
};

export default BlackList;
