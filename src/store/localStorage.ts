
export type LocalStorageType = {
    minLocalStorage: number
    maxLocalStorage: number
}

export type LocalStorageStateType = LocalStorageType | undefined

export const loadLocalStorage = (): LocalStorageStateType => {
    try {
        const minLocalStorage = localStorage.getItem('minLocalStorage')
        const maxLocalStorage = localStorage.getItem('maxLocalStorage')
        if (minLocalStorage === null || maxLocalStorage === null) {
            return undefined
        }
        return {minLocalStorage: +JSON.parse(minLocalStorage), maxLocalStorage: +JSON.parse(maxLocalStorage)}
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