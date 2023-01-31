import React, { useState } from 'react';
import MyButton from '../ui/MyButton/MyButton';
import cl from './BlackListUserSelector.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MyInput from '../ui/MyInput/MyInput';


const BlackListUserSelector: React.FC = () => {

    const [userImg, setUserImg] = useState('');

    library.add(faPlus);
    return (
        <div className={cl.leaderboard__profile}>
            {userImg ? (
                <>
                    <img src='' alt='' className={cl.leaderboard__picture} />
                </>
            ) : (
                <>
                    <div className={cl.img_stub} />
                </>
            )}
            <MyInput placeholder="Чёрный список" />
            <MyButton text='' onClick={() => { }} icon_type='plus' />
        </div>

    );
};

export default BlackListUserSelector;
