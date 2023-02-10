import {loadLocalStorage, LocalStorageStateType} from "./localStorage";

const INCREASE_COUNTER = 'INCREASE-COUNTER'
const RESET_COUNTER = 'RESET-COUNTER'
const SET_COUNTER_MIN_MAX_VALUE = 'SET-COUNTER-MIN-MAX-VALUE'
const CHANGE_COUNTER_MIN_MAX_VALUE = 'CHANGE-COUNTER-MIN-MAX-VALUE'

export type IncreaseCounterAT = ReturnType<typeof increaseCounterAC>
export type ResetCounterAT = ReturnType<typeof resetCounterAC>
export type SetCounterMinMaxValueAT = ReturnType<typeof setCounterMinMaxValueAC>
export type ChangeCounterMinMaxValueAT = ReturnType<typeof changeCounterMinMaxValueAC>

export type ActionType = IncreaseCounterAT
    | ResetCounterAT
    | SetCounterMinMaxValueAT
    | ChangeCounterMinMaxValueAT

export type ErrorType = {
    unSave: boolean
    inputError: boolean
}

export type CounterStateType = {
    value: number
    min: number,
    max: number,
    error: ErrorType
    localStorage: LocalStorageStateType
}

const initialState = () => {
    const localStorage = loadLocalStorage()
    if (localStorage) {
        return {
            value: localStorage.minLocalStorage,
            min: localStorage.minLocalStorage,
            max: localStorage.maxLocalStorage,
            error: {unSave: false, inputError: false},
            localStorage: localStorage
        }
    } else {
        return {
            value: 0,
            min: 0,
            max: 5,
            error: {unSave: false, inputError: false},
            localStorage: loadLocalStorage()
        }
    }
}

export const counterReducer = (state: CounterStateType = initialState(), action: ActionType): CounterStateType => {
    switch (action.type) {
        case INCREASE_COUNTER:
            if (state.value === state.max) {
                return state
            }
            return {...state, value: state.value + 1}
        case RESET_COUNTER:
            return {...state, value: state.value = state.min}
        case SET_COUNTER_MIN_MAX_VALUE:
            return {
                ...state,
                min: action.min,
                max: action.max,
                value: action.min,
                error: {...state.error, unSave: false}
            }
        case CHANGE_COUNTER_MIN_MAX_VALUE:
            let unSave = false
            let inputError = false

            if (action.minValue < 0 || action.minValue >= action.maxValue) {
                inputError = true
            }
            if (action.minValue !== state.min || action.maxValue !== state.max) {
                unSave = true
            }

            return state.error.unSave !== unSave || state.error.inputError !== inputError
                ? {...state, error: {...state.error, inputError, unSave}}
                : state
        default:
            return state
    }
}

export const increaseCounterAC = () => {
    return {type: INCREASE_COUNTER} as const
}
export const resetCounterAC = () => {
    return {type: RESET_COUNTER} as const
}
export const setCounterMinMaxValueAC = (min: number, max: number) => {
    return {type: SET_COUNTER_MIN_MAX_VALUE, min, max} as const
}
export const changeCounterMinMaxValueAC = (minValue: number, maxValue: number) => {
    return {type: CHANGE_COUNTER_MIN_MAX_VALUE, minValue, maxValue} as const
}