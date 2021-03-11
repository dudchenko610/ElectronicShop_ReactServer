import { removeByValue } from "./array-methods"

const eventListeners = []

export const addPopStateListener = (callback) => {
    eventListeners.push(callback)
}

export const removePopStateListener = (callback) => {
    removeByValue(eventListeners, callback)
}


export const initPopStateListener = () => {
    window.onpopstate = () => {
        eventListeners.map( (callback, index, array) => {
            callback()
        } )
    }
}