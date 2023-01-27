import React, { useState } from 'react';
import MyButton from '../ui/MyButton/MyButton';
import MyInput from '../ui/MyInput/MyInput';
import cl from './FormSearching.module.css';

export default function FormSearching() {

    const [btnText, setBtnText] = useState('Показать настройки');
    const [showOrHideSettings, setShowOrHideSettings] = useState(true);

    function changeButtonText() {
        setBtnText(showOrHideSettings ? 'Показать настройки' : 'Скрыть настройки');
    }

    const changeVision = () => {
        setShowOrHideSettings(!showOrHideSettings);
        changeButtonText();
    };

    return (
        <div className={cl.formsearching}>
            <MyButton onClick={changeVision} text={btnText} />
            <MyInput placeholder='Login' />
            <MyInput placeholder='Repository name' />
        </div>
    );
}
