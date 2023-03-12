import React from 'react';
import {Button} from '../../button/Button';
import {CounterFormTitle} from '../Title/CounterTitle';
import classes from './CounterForm.module.css';
import {ErrorType} from '../../../store/counter-reducer';

type PropsType = {
    minValue: number
    maxValue: number
    counterValue: number
    error: ErrorType
    increaseCounter: () => void
    resetCounter: () => void
}

export const CounterForm: React.FC<PropsType> = ({counterValue, minValue, maxValue, increaseCounter, resetCounter, error}) => {

    const errorHandler = error.unSave || error.inputError
    const disabledAddButton = counterValue === maxValue || errorHandler
    const disabledResetButton = counterValue === minValue || errorHandler
    const counterTitle = error.inputError
        ? 'Wrong input!'
        : error.unSave
            ? 'Need to save!'
            : counterValue

    return (
        <div className={classes.container}>
            <h3>Counter</h3>
                <CounterFormTitle value={counterTitle}/>
            <div>
                <Button callBack={increaseCounter} disabled={disabledAddButton}>inc</Button>
                <Button callBack={resetCounter} disabled={disabledResetButton}>reset</Button>
            </div>
        </div>
    );
};