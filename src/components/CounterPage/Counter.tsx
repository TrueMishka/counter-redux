import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store/store";
import {CounterStateType, increaseCounterAC, resetCounterAC, setCounterValueTC} from "../../store/counter-reducer";
import {CounterSetter} from "./Setter/CounterSetter";
import {CounterForm} from "./Form/CounterForm";
import classes from './Counter.module.css';
import bgImg from '../../common/assets/image/bg.jpg'

export const Counter = () => {
    const dispatch = useAppDispatch()
    const counterState = useAppSelector<CounterStateType>(state => state.counter)

    const increaseCounter = () => {
        dispatch(increaseCounterAC())
    }

    const resetCounter = () => {
        dispatch(resetCounterAC())
    }

    const setCounterMinMaxValue = (min: number, max: number) => {
        dispatch(setCounterValueTC(min, max))
    }

    return (
        <div style={{backgroundImage: `URL(${bgImg})`}} className={classes.counterContainer}>
            <CounterSetter
                minValue={counterState.min}
                maxValue={counterState.max}
                setCounterMinMaxValue={setCounterMinMaxValue}
                error={counterState.error}
            />
            <CounterForm
                counterValue={counterState.value}
                minValue={counterState.min}
                maxValue={counterState.max}
                error={counterState.error}
                increaseCounter={increaseCounter}
                resetCounter={resetCounter}
            />
        </div>
    );
};