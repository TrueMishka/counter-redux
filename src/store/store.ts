import {combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./counter-reducer";
import {saveLocalStorage} from "./localStorage";

const rootReducer = combineReducers({
    counter: counterReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

/*
store.subscribe(() => {
    saveLocalStorage(store.getState().counter.min, store.getState().counter.max)
})*/
