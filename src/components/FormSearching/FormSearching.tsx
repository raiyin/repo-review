import React, { useState } from 'react';
import BlackList from '../BlackList/BlackList';
import MyButton from '../ui/MyButton/MyButton';
import MyInput from '../ui/MyInput/MyInput';
import cl from './FormSearching.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function FormSearching() {
    const [btnText, setBtnText] = useState('Показать настройки');
    const [showOrHideSettings, setShowOrHideSettings] = useState(false);
    library.add(faGear);

    function changeButtonText() {
        setBtnText(showOrHideSettings ? 'Показать настройки' : 'Скрыть настройки');
    }

    const changeVision = () => {
        setShowOrHideSettings(!showOrHideSettings);
        changeButtonText();
    };

    return (
        <div className={cl.formsearching}>
            <MyButton onClick={changeVision} text={btnText} icon_type='gear' />
            {showOrHideSettings ? (
                <>
                    <MyInput placeholder="Login" />
                    <MyInput placeholder="Repository name" />
                    <BlackList />

                </>
            ) : (
                <></>
            )}
        </div>
    );
}
