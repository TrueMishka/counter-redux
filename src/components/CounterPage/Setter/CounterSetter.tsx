import React, {useState} from 'react';
import classes from './CounterSetter.module.css';
import {Input} from '../../input/Input';
import {Button} from '../../button/Button';
import {useDispatch} from 'react-redux';
import {changeCounterMinMaxValueAC, ErrorType} from '../../../store/counter-reducer';

type PropsType = {
    minValue: number
    maxValue: number
    setCounterMinMaxValue: (min: number, max: number) => void
    error: ErrorType
}

export const CounterSetter: React.FC<PropsType> = (
    {
        minValue,
        maxValue,
        error,
        setCounterMinMaxValue
    }) => {

    const dispatch = useDispatch()

    const [inputMinValue, setInputMinValue] = useState(minValue)
    const [inputMaxValue, setInputMaxValue] = useState(maxValue)

    const onChangeMinValue = (value: number) => {
        dispatch(changeCounterMinMaxValueAC(value, inputMaxValue))
        setInputMinValue(value)
    }

    const onChangeMaxValue = (value: number) => {
        dispatch(changeCounterMinMaxValueAC(inputMinValue, value))
        setInputMaxValue(value)
    }

    const setMinMaxHandler = () => {
        setCounterMinMaxValue(inputMinValue, inputMaxValue)
    }

    const errorHandlerMin = error.inputError
        ? inputMinValue >= inputMaxValue || inputMinValue < 0 : false
    const errorHandlerMax = error.inputError
        ? inputMaxValue <= inputMinValue || inputMaxValue < 0 : false
    const disabledButtonSet = errorHandlerMin || errorHandlerMax


    return (
        <div className={classes.container}>
            <div>
                <Input value={inputMinValue} onChange={onChangeMinValue} title={'Min'} error={errorHandlerMin}/>
                <Input value={inputMaxValue} onChange={onChangeMaxValue} title={'Max'} error={errorHandlerMax}/>
            </div>
            <div>
                <Button callBack={setMinMaxHandler} disabled={disabledButtonSet}>Set</Button>
            </div>
        </div>
    );

};