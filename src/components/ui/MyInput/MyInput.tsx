import React from 'react';
import cl from './MyInput.module.css';

interface InputProps {
    value: string;
    placeholder: string;
    props: any;
}

const MyInput: React.FC<InputProps> = ({ value, placeholder, props }) => {
    return (
        <div className={cl.group}>
            <input type="text" required {...props} >{value}</input>
            <span className={cl.highlight}></span>
            <span className={cl.bar}></span>
            <label>{placeholder}</label>
        </div>
    );
};

export default MyInput;
