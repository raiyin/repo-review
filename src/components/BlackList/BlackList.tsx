import React, { useState } from 'react';
import BlackListItem from '../BlackListItem/BlackListItem';
import BlackListUserSelector from '../BlackListUserSelector/BlackListUserSelector';
import MyInput from '../ui/MyInput/MyInput';
import cl from './BlackList.module.css';

export default function BlackList() {

    return (
        <>
            <BlackListUserSelector />
            <div className={cl.leaderboard}>
                <div className="leaderboard__profiles">
                    <BlackListItem login='Pixi' img='https://randomuser.me/api/portraits/men/33.jpg' />
                </div>
            </div>
        </>
    );
}
