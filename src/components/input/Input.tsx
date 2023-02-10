import React, {ChangeEvent} from 'react';
import classes from "./Input.module.css";

type PropsType = {
    value: number
    onChange: (value: number) => void
    title?: string
    error: boolean
}

export const Input:React.FC<PropsType> = ({value, onChange, title, error}) => {
    const inputStyle = `${classes.input} ${error ? classes.errorInput : ''}`
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.currentTarget.value))
    }

    return (
        <div className={classes.inputWrapper}>
            {title && <span className={classes.inputTitle}>{title}</span>}
            <input type={'number'} value={value} onChange={onChangeHandler} className={inputStyle} />
        </div>
    );
};