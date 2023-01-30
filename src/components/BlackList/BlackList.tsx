import React, { useState } from 'react';
import BlackListItem from '../ui/BlackListItem/BlackListItem';
import cl from './BlackList.module.css';

export default function BlackList() {

    return (
        <div className={cl.leaderboard}>

            <div className="leaderboard__profiles">
                <BlackListItem login='Mark' img='https://randomuser.me/api/portraits/men/31.jpg' />
                <BlackListItem login='Twen' img='https://randomuser.me/api/portraits/men/30.jpg' />
                <BlackListItem login='Max' img='https://randomuser.me/api/portraits/men/32.jpg' />
                <BlackListItem login='Pixi' img='https://randomuser.me/api/portraits/men/33.jpg' />
            </div>
        </div>
    );
}
