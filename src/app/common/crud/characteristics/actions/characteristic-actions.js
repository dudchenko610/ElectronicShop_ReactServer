import React from "react"
import {crudApi} from "../../../../../core/api"
import {store} from "../../../../../index"

import {PopupListener} from "../../../../../core/popup-utils"
import ProgressBar from "../../../components/ProgressBar"

import {showAlertPopupAction, hidePopupAction, showAlertPopupXAction} from "../../../actions/popup-actions"
import { getProductsAction } from "../../products/actions/product-actions"

export const CHARACTERISTIC_ACTION_TYPES = {
    GET_ALL_CHARACTERISTICS: "GET_ALL_CHARACTERISTICS",
    GET_ALL_CHARACTERISTICS_SUCCESS: "GET_ALL_CHARACTERISTICS_SUCCESS",
    GET_ALL_CHARACTERISTICS_FAILED: "GET_ALL_CHARACTERISTICS_FAILED",

    GET_CHARACTERISTIC: "GET_CHARACTERISTIC",
    GET_CHARACTERISTIC_SUCCESS: "GET_CHARACTERISTIC_SUCCESS",
    GET_CHARACTERISTIC_FAILED: "GET_CHARACTERISTIC_FAILED",


    ADD_CHARACTERISTIC: "ADD_CHARACTERISTIC",
    ADD_CHARACTERISTIC_SUCCESS: "ADD_CHARACTERISTIC_SUCCESS",
    ADD_CHARACTERISTIC_FAILED: "ADD_CHARACTERISTIC_FAILED",

    REMOVE_CHARACTERISTIC: "REMOVE_CHARACTERISTIC",
    REMOVE_CHARACTERISTIC_SUCCESS: "REMOVE_CHARACTERISTIC_SUCCESS",
    REMOVE_CHARACTERISTIC_FAILED: "REMOVE_CHARACTERISTIC_FAILED",

    UPDATE_CHARACTERISTIC: "UPDATE_CHARACTERISTIC",
    UPDATE_CHARACTERISTIC_SUCCESS: "UPDATE_CHARACTERISTIC_SUCCESS",
    UPDATE_CHARACTERISTIC_FAILED: "UPDATE_CHARACTERISTIC_FAILED"
}

export const getCharacteristicsAction = (callbackFunc = null) => {
    return dispatch => {

        dispatch({
            type: CHARACTERISTIC_ACTION_TYPES.GET_ALL_CHARACTERISTICS
        })

        crudApi().getCharacteristics()
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: CHARACTERISTIC_ACTION_TYPES.GET_ALL_CHARACTERISTICS_FAILED
                        })

                        if (callbackFunc) {
                            callbackFunc.onError(res.data.error)
                        }

                        return
                    }

                    const stateStorage = store.getState()
                        
                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.GET_ALL_CHARACTERISTICS_SUCCESS,
                        payload: {
                            data: res.data,
                            categoriesReducer: stateStorage.categoriesReducer
                        }
                    })

                    if (callbackFunc) {
                        callbackFunc.onSuccess()
                    }
                }
            )
            .catch(
                err => {
                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.GET_ALL_CHARACTERISTICS_FAILED
                    })

                    if (callbackFunc) {
                        callbackFunc.onError(err.error)
                    }
                }
            )
    }
}

export const addCharacteristicAction = (data) => {
    return dispatch => {

        dispatch({
            type: CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC
        })

        crudApi().addCharacteristic(data)
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_FAILED
                        })

                        dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ res.data.error }</label></div>)))
                        // show error popup

                        return

                    }

                    const stateStorage = store.getState()

                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_SUCCESS,
                        payload: {
                            data: res.data,
                            categoriesReducer: stateStorage.categoriesReducer
                        }
                    })

                }
            )
            .catch(
                err => {

                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_FAILED
                    })

                    dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ err.error }</label></div>)))
                    // show error popup

                }
            )

    }
}

export const updateCharacteristicAction = (characteristicOld, characteristicNew) => {
    return dispatch => {

        characteristicNew.id = characteristicOld.id

        dispatch({
            type: CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC,
            payload: characteristicOld
        })

        crudApi().updateCharacteristic(characteristicNew)
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_FAILED,
                            payload: characteristicOld
                        })
    
                        dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ res.data.error }</label></div>)))

                        return 
                    }
 
                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_SUCCESS,
                        payload: {
                            old: characteristicOld,
                            new: characteristicNew
                        }
                    })
                    
                }
            )
            .catch(
                err => {
                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_FAILED,
                        payload: characteristicOld
                    })

                    dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{err.error}</label></div>)))

                }
            )

    }
}

export const removeCharacteristicAction = (characteristic) => {
    return dispatch => {
        
        //console.log(category)

        dispatch({
            type: CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC,
            payload: characteristic
        })

        crudApi().removeCharacteristic( { id : characteristic.id } )
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_FAILED,
                            payload: characteristic

                        })

                        dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>{ res.data.error }</label></div>)))

                        return
                    }

                    const stateStorage = store.getState()

                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_SUCCESS,
                        payload: {
                            data: characteristic,
                            categoriesReducer: stateStorage.categoriesReducer
                        }
                    })

                    dispatch(
                        getProductsAction()
                    )

                    dispatch(showAlertPopupXAction({width: 300, height:100}, (<div>Характеристика успешно удалена</div>)))

                }
            )
            .catch(
                err => {

                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_FAILED,
                        payload: characteristic
                    })

                    console.log(err)
                    
                    dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>{ err }</label></div>)))

                }
            )

    }
}

export const getCharacteristicAction = (characteristicId) => {
    return dispatch => {

        dispatch({
            type: CHARACTERISTIC_ACTION_TYPES.GET_CHARACTERISTIC,
            payload: characteristicId
        })

        console.log("characteristicId = " + characteristicId)
        
        crudApi().getCharacteristic(characteristicId)
            .then(
                res => {

                    console.log("GET_CHARACTERISTIC")
                    console.log(res.data)

                    if (res.data.error) {

                        dispatch({
                            type: CHARACTERISTIC_ACTION_TYPES.GET_CHARACTERISTIC_FAILED,
                            payload: characteristicId
                        })

                        return
                    }

                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.GET_CHARACTERISTIC_SUCCESS,
                        payload: res.data
                    })
                }
            )
            .catch(
                err => {
                    console.log("GET_CHARACTERISTIC")
                    console.log(err)

                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.GET_CHARACTERISTIC_FAILED,
                        payload: characteristicId
                    })
                }
            )

    }
}

export const characteristicsListener = () => {

    const characteristicsListener = new PopupListener(
        <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>,
        { width: 400, height: 200},
    
        (errorMessage) => {
            return (
                <div>
                    <p>Get characteristics error</p>
                    <p>{errorMessage}</p>
        
                    <a onClick={() => {
                        characteristicsListener.onRepeat()
                    }}>Repeat</a>
        
                    <a onClick={() => {
                        store.dispatch(characteristicsListener.hide(characteristicsListener.errorDivWithError))
                    }}>Cancel</a>
        
                </div>
            )
        },
        { width: 400, height: 200},
    
        hidePopupAction,
        showAlertPopupAction,
        getCharacteristicsAction
    
    )

    return characteristicsListener

} 
