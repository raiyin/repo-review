import UserListItem from '../UserListItem/UserListItem';
import { GitHubContribObject } from '../../api/githubService';
import cl from './UserList.module.css';
import { FC } from 'react';

interface UserListProps {
    blItems: Array<GitHubContribObject>;
    remove: Function;
}

const BlackList: FC<UserListProps> = ({ blItems, remove }: UserListProps) => {
    if (!blItems.length) {
        return (
            <div></div>
        );
    }

    return (
        <>
            <div className={cl.leaderboard}>
                <div className="leaderboard__profiles">

                    {blItems.map((blItem) => (
                        <UserListItem key={blItem.login} remove={remove} blItem={blItem} />
                    ))}
                </div>
            </div>
        </>
    );
};


export default BlackList;
