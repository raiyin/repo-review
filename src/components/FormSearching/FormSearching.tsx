import React, { useState } from 'react';
import BlackList from '../BlackList/BlackList';
import MyButton from '../ui/MyButton/MyButton';
import MyInput from '../ui/MyInput/MyInput';
import cl from './FormSearching.module.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function FormSearching() {
    const [btnText, setBtnText] = useState('Показать настройки');
    const [showOrHideSettings, setShowOrHideSettings] = useState(false);
    library.add(faGear);
    library.add(faUsers);

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
                    <MyInput placeholder="Логин" />
                    <MyInput placeholder="Название репозитория" />
                    <BlackList />
                    <MyInput placeholder="Ревьюер появится здесь" />
                    <MyButton onClick={() => { }} text='Сгенерировать' icon_type='users' />
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
