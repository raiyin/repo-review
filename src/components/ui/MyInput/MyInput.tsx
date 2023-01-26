import React from 'react';
import cl from './MyInput.module.css';

interface InputProps {
    placeholder: string;
}

const MyInput: React.FC<InputProps> = ({ placeholder }) => {
    return (
        <div className={cl.group}>
            <input type="text" required />
            <span className={cl.highlight}></span>
            <span className={cl.bar}></span>
            <label>{placeholder}</label>
        </div>
    );
};

export default MyInput;
