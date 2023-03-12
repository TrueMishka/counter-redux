export type LocalStorageType = {
    minLocalStorage: number
    maxLocalStorage: number
    value: number
}

export type LocalStorageStateType = LocalStorageType | undefined

export const loadLocalStorage = (): LocalStorageStateType => {
    try {
        const minLocalStorage = localStorage.getItem('minLocalStorage')
        const maxLocalStorage = localStorage.getItem('maxLocalStorage')
        const value = localStorage.getItem('value')
        if (!minLocalStorage || !maxLocalStorage || !value) {
            return undefined
        }
        return {minLocalStorage: +JSON.parse(minLocalStorage), maxLocalStorage: +JSON.parse(maxLocalStorage), value: +JSON.parse(value)}
    } catch (err) {
        return undefined
    }
}

export const saveLocalStorage = (min: number, max: number) => {
    try {
        const minState = JSON.stringify(min)
        const maxState = JSON.stringify(max)
        localStorage.setItem('minLocalStorage', minState)
        localStorage.setItem('maxLocalStorage', maxState)
    } catch (err) {
        // ignore
    }
}
export const saveLocalStorageCountValue = (value: number) => {
    try {
        const currentValue = JSON.stringify(value)
        localStorage.setItem('value', currentValue)
    } catch (err) {
        // ignore
    }
}