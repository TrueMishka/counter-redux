import React from 'react';
import classes from "./Counter.module.css";

type PropsType = {
    value: number | string
}

export const CounterFormTitle:React.FC<PropsType> = ({value}) => {
    return (
        <span className={classes.counterValueText}>{value}</span>
    );
};