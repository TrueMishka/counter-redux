import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {counterReducer} from "./counter-reducer";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {loadLocalStorage, saveLocalStorageCountValue} from "./localStorage";

const rootReducer = combineReducers({
    counter: counterReducer
})

const preLoaderState = (): AppStateType => {
    const localStateStore = loadLocalStorage()
    if (localStateStore) {
        return {
            counter: {
                min: localStateStore.minLocalStorage,
                max: localStateStore.maxLocalStorage,
                value: localStateStore.value,
                error: {unSave: false, inputError: false}
            }
        }
    } else {
        return {
            counter: {
                min: 0,
                max: 5,
                value: 0,
                error: {unSave: false, inputError: false}
            }
        }
    }
}

export const store = createStore(rootReducer, preLoaderState(), applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

type ThunkDispatchType = ThunkDispatch<AppStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

store.subscribe(() => {
    saveLocalStorageCountValue(store.getState().counter.value)
})