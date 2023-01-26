import React from 'react';
import ReactNode from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import cl from './MyButton.module.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const MyButton: React.FC<ButtonProps> = ({ text, ...props }) => {

    return (
        <div>
            <button {...props} className={cl.btn}>
                <FontAwesomeIcon icon={solid('gear')} />&nbsp;{text}
            </button>
        </div>
    );
};

export default MyButton;
