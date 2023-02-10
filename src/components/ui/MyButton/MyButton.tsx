import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cl from './MyButton.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
    text: string;
    icon_type: IconProp;
    onClick: () => void;
}

const MyButton: React.FC<ButtonProps> = ({ text, icon_type, ...props }) => {

    return (
        <div>
            <button {...props} className={cl.btn}>
                <FontAwesomeIcon style={{ textAlign: 'center' }} icon={icon_type} />
                {text ? (<>&nbsp;</>) : (<></>)}
                {text}
            </button>
        </div>
    );
};

export default MyButton;
