import BlackListItem from '../BlackListItem/BlackListItem';
import { GitHubContribObject } from '../../api/GithubService';
import cl from './BlackList.module.css';
import { FC } from 'react';

interface BlackListProps {
    blItems: Array<GitHubContribObject>;
    remove: Function;
}

const BlackList: FC<BlackListProps> = ({ blItems, remove }: BlackListProps) => {
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
                        <BlackListItem key={blItem.login} remove={remove} blItem={blItem} />
                    ))}
                </div>
            </div>
        </>
    );
};


export default BlackList;
