import React, { useState } from 'react';
import MyButton from '../ui/MyButton/MyButton';
import cl from './BlackListItem.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ReviewerProps {
    login: string;
    img: string;
}

const BlackList: React.FC<ReviewerProps> = ({ login, img }) => {

    library.add(faXmark);
    return (
        <div className={cl.leaderboard__profile}>
            <img src={img} alt={login} className={cl.leaderboard__picture} />
            <span className={cl.leaderboard__name}>{login}</span>
            <MyButton text='' onClick={() => { }} icon_type='xmark' />
        </div>

    );
};

export default BlackList;
