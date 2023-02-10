import React from 'react';
import './App.css';
import {CounterSetter} from "./components/CounterPage/CounterSetter";
import {CounterForm} from "./components/CounterPage/CounterForm";
import {
    CounterStateType,
    increaseCounterAC,
    resetCounterAC,
    setCounterMinMaxValueAC
} from "./store/counter-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {saveLocalStorage} from "./store/localStorage";

function App() {

    const dispatch = useDispatch()
    const counterState = useSelector<AppRootState, CounterStateType>(state => state.counter)

    const increaseCounter = () => {
        dispatch(increaseCounterAC())
    }

    const resetCounter = () => {
        dispatch(resetCounterAC())
    }

    const setCounterMinMaxValue = (min: number, max: number) => {
        dispatch(setCounterMinMaxValueAC(min, max))
        saveLocalStorage(min, max)
    }

    const counterMin = counterState.localStorage ? counterState.localStorage.minLocalStorage : counterState.min
    const counterMax = counterState.localStorage ? counterState.localStorage.maxLocalStorage : counterState.max

    return (
        <div className="App">
            <CounterSetter
                minValue={counterState.min}
                maxValue={counterState.max}
                /*minValue={counterMin}
                maxValue={counterMax}*/
                setCounterMinMaxValue={setCounterMinMaxValue}
                error={counterState.error}
            />
            <CounterForm
                counterValue={counterState.value}
                /*minValue={counterMin}
                maxValue={counterMax}*/
                minValue={counterState.min}
                maxValue={counterState.max}
                error={counterState.error}
                increaseCounter={increaseCounter}
                resetCounter={resetCounter}
            />
        </div>
    );
}

export default App;
