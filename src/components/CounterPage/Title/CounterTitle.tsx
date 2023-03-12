import React from 'react';
import classes from './CounterTitle.module.css';

type PropsType = {
    value: number | string
}

export const CounterFormTitle:React.FC<PropsType> = ({value}) => {
    return (
        <span className={classes.text}>{value}</span>
    );
};