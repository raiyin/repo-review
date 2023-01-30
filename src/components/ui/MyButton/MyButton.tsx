import React from 'react';
import ReactNode from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import cl from './MyButton.module.css';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';

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
