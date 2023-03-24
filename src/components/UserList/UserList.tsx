import UserListItem from '../UserListItem/UserListItem';
import cl from './UserList.module.css';
import { FC } from 'react';
import { UserListProps } from '../../types';

const BlackList: FC<UserListProps> = ({ blItems, remove }: UserListProps) => {
    if (!blItems.length) {
        return (
            <div></div>
        );
    }

    return (
        <>
            <div className={cl.userlist}>
                <div className="userlist__profiles">

                    {blItems.map((blItem) => (
                        <UserListItem key={blItem.login} remove={remove} blItem={blItem} />
                    ))}
                </div>
            </div>
        </>
    );
};


export default BlackList;
