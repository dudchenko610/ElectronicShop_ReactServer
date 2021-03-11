import React from "react"
import {crudApi} from "../../../../../core/api"

import {store} from "../../../../../index"

import {PopupListener} from "../../../../../core/popup-utils"
import ProgressBar from "../../../components/ProgressBar"

import {showAlertPopupAction, hidePopupAction} from "../../../actions/popup-actions"
import { getProductsAction } from "../../products/actions/product-actions"

export const MANUFACTURER_ACTION_TYPES = {

    GET_ALL_MANUFACTURERS: "GEAT_ALL_MANUFACTURERS",
    GET_ALL_MANUFACTURERS_SUCCESS: "GET_ALL_MANUFACTURERS_SUCCESS",
    GET_ALL_MANUFACTURERS_FAILED: "GET_ALL_MANUFACTURERS_FAILED",

    GET_MANUFACTURER: "GET_MANUFACTURER",
    GET_MANUFACTURER_SUCCESS: "GET_MANUFACTURER_SUCCESS",
    GET_MANUFACTURER_FAILED: "GET_MANUFACTURER_FAILED",


    ADD_MANUFACTURER: "ADD_MANUFACTURER",
    ADD_MANUFACTURER_SUCCESS: "ADD_MANUFACTURER_SUCCESS",
    ADD_MANUFACTURER_FAILED: "ADD_MANUFACTURER_FAILED",

    REMOVE_MANUFACTURER: "REMOVE_MANUFACTURER",
    REMOVE_MANUFACTURER_SUCCESS: "REMOVE_MANUFACTURER_SUCCESS",
    REMOVE_MANUFACTURER_FAILED: "REMOVE_MANUFACTURER_FAILED",

    UPDATE_MANUFACTURER: "UPDATE_MANUFACTURER",
    UPDATE_MANUFACTURER_SUCCESS: "UPDATE_MANUFACTURER_SUCCESS",
    UPDATE_MANUFACTURER_FAILED: "UPDATE_MANUFACTURER_FAILED"

}

export const getManufacturersAction = (callbackFunc = null) => {
    return dispatch => {

        dispatch({
            type: MANUFACTURER_ACTION_TYPES.GET_ALL_MANUFACTURERS
        })

        crudApi().getManufacturers()
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: MANUFACTURER_ACTION_TYPES.GET_ALL_MANUFACTURERS_FAILED
                        })

                        if (callbackFunc) {
                            callbackFunc.onError(res.data.error)
                        }

                        return
                    }

                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.GET_ALL_MANUFACTURERS_SUCCESS,
                        payload: res.data
                    })

                    if (callbackFunc) {
                        callbackFunc.onSuccess()
                    }

                }
            )
            .catch(
                err => {
                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.GET_ALL_MANUFACTURERS_FAILED
                    })

                    if (callbackFunc) {
                        callbackFunc.onError(err.error)
                    }
                }
            )
    }
}

export const addManufacturerAction = (data) => {
    return dispatch => {

        dispatch({
            type: MANUFACTURER_ACTION_TYPES.ADD_MANUFACTURER
        })

        crudApi().addManufacturer(data)
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: MANUFACTURER_ACTION_TYPES.ADD_MANUFACTURER_FAILED
                        })

                        dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ res.data.error }</label></div>)))
                        // show error popup

                        return
                    }

                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.ADD_MANUFACTURER_SUCCESS,
                        payload: res.data
                    })
                }
            )
            .catch(
                err => {

                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.ADD_MANUFACTURER_FAILED
                    })

                    dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>Неудалось добавить производителя. Попробуйте еще раз</label></div>)))
                    // show error popup

                }
            )

    }
}

export const updateManufacturerAction = (manufacturerOld, manufacturerNew) => {
    return dispatch => {

        manufacturerNew.id = manufacturerOld.id

        dispatch({
            type: MANUFACTURER_ACTION_TYPES.UPDATE_MANUFACTURER,
            payload: manufacturerOld
        })

        crudApi().updateManufacturer(manufacturerNew)
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: MANUFACTURER_ACTION_TYPES.UPDATE_MANUFACTURER_FAILED,
                            payload: manufacturerOld
                        })
    
                        dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ res.data.error }</label></div>)))
    
                        return
                    }
 
                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.UPDATE_MANUFACTURER_SUCCESS,
                        payload: {
                            old: manufacturerOld,
                            new: manufacturerNew
                        }
                    })

                    
                }
            )
            .catch(
                err => {
                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.UPDATE_MANUFACTURER_FAILED,
                        payload: manufacturerOld
                    })

                    dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ err.error }</label></div>)))

                }
            )

    }
}

export const removeManufacturerAction = (manufacturer) => {
    return dispatch => {
        
        //console.log(category)

        dispatch({
            type: MANUFACTURER_ACTION_TYPES.REMOVE_MANUFACTURER,
            payload: manufacturer
        })

        crudApi().removeManufacturer(manufacturer)
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: MANUFACTURER_ACTION_TYPES.REMOVE_MANUFACTURER_FAILED,
                            payload: manufacturer

                        })
                        dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ res.data.error }</label></div>)))

                        return
                    }

                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.REMOVE_MANUFACTURER_SUCCESS,
                        payload: manufacturer
                    })

                    dispatch(
                        getProductsAction()
                    )
                }
            )
            .catch(
                err => {
                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.REMOVE_MANUFACTURER_FAILED,
                        payload: manufacturer
                    })

                    dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ err.error }</label></div>)))

                }
            )

    }
}

export const getManufacturerAction = (manufacturerId) => {
    return dispatch => {
        dispatch({
            type: MANUFACTURER_ACTION_TYPES.GET_MANUFACTURER,
            payload: manufacturerId
        })

        crudApi().getManufacturer(manufacturerId)
            .then(
                res => {
                    if (res.data.error) {

                        console.log(res.data.error)

                        dispatch({
                            type: MANUFACTURER_ACTION_TYPES.GET_MANUFACTURER_FAILED,
                            payload: manufacturerId
                        })

                        return
                    }

                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.GET_MANUFACTURER_SUCCESS,
                        payload: res.data
                    })
                }
            )
            .catch(
                err => {

                    console.log(err)

                    dispatch({
                        type: MANUFACTURER_ACTION_TYPES.GET_MANUFACTURER_FAILED,
                        payload: manufacturerId
                    })
                }
            )

    }
}


// popup listeners

export const manufacturersListener = () => {

    const manufacturersListener = new PopupListener(
        <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>,
        { width: 400, height: 200},
    
        (errorMessage) => {
            return (
                <div>
                    <p>Get manufacturers error</p>
                    <p>{errorMessage}</p>
        
                    <a onClick={() => {
                        manufacturersListener.onRepeat()
                    }}>Repeat</a>
        
                    <a onClick={() => {
                        store.dispatch(manufacturersListener.hide(manufacturersListener.errorDivWithError))
                    }}>Cancel</a>
        
                </div>
            )
        },
        { width: 400, height: 200},
    
        hidePopupAction,
        showAlertPopupAction,
        getManufacturersAction
    
    )

    return manufacturersListener

} 