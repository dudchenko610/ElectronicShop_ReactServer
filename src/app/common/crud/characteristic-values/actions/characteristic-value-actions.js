import React from "react"
import {crudApi} from "../../../../../core/api"
import {showAlertPopupAction, showAlertPopupXAction} from "../../../actions/popup-actions"

import {store} from "../../../../../index"
import { getProductsAction } from "../../products/actions/product-actions"

export const CHARACTERISTIC_ACTION_TYPES = {
    ADD_CHARACTERISTIC_VALUE: "ADD_CHARACTERISTIC_VALUE",
    ADD_CHARACTERISTIC_VALUE_SUCCESS: "ADD_CHARACTERISTIC_VALUE_SUCCESS",
    ADD_CHARACTERISTIC_VALUE_FAILED: "ADD_CHARACTERISTIC_VALUE_FAILED",

    INSERT_CHARACTERISTIC_VALUE: "INSERT_CHARACTERISTIC_VALUE",

    REMOVE_CHARACTERISTIC_VALUE: "REMOVE_CHARACTERISTIC_VALUE",
    REMOVE_CHARACTERISTIC_VALUE_SUCCESS: "REMOVE_CHARACTERISTIC_VALUE_SUCCESS",
    REMOVE_CHARACTERISTIC_VALUE_FAILED: "REMOVE_CHARACTERISTIC_VALUE_FAILED",

    UPDATE_CHARACTERISTIC_VALUE: "UPDATE_CHARACTERISTIC_VALUE",
    UPDATE_CHARACTERISTIC_VALUE_SUCCESS: "UPDATE_CHARACTERISTIC_VALUE_SUCCESS",
    UPDATE_CHARACTERISTIC_VALUE_FAILED: "UPDATE_CHARACTERISTIC_VALUE_FAILED"    
}

export const addCharacteristicValueAction = (characteristicValue, characteristic) => {
    return dispatch => {

        dispatch({
            type: CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_VALUE
        })

        characteristicValue.characteristicId = characteristic.id


        crudApi().addCharacteristicValue(characteristicValue)
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_VALUE_FAILED
                        })

                        dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ res.data.error }</label></div>)))
                        // show error popup

                        return
                    }

                    const response = {
                        characteristicValue: res.data,
                        characteristic : characteristic
                    }

                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_VALUE_SUCCESS,
                        payload: response
                    })
                    
                
                }
            )
            .catch(
                err => {
                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_VALUE_FAILED
                    })

                    dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{err.error}</label></div>)))
                    
                }
            )

    }
}

export const updateCharacteristicValueAction = (characteristicValueOld, characteristicValueNew) => {
    return dispatch => {
        characteristicValueNew.id = characteristicValueOld.id

        dispatch({
            type: CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_VALUE,
            payload: characteristicValueOld
        })

        crudApi().updateCharacteristicValue(characteristicValueNew)
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_VALUE_FAILED,
                            payload: characteristicValueOld
                        })
    
                        dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ res.data.error }</label></div>)))

                        return
                    }
 
                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_VALUE_SUCCESS,
                        payload: {
                            old: characteristicValueOld,
                            new: characteristicValueNew
                        }
                    })

                    
                }
            )
            .catch(
                err => {
                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_VALUE_FAILED,
                        payload: characteristicValueOld
                    })

                    dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{ err.error }</label></div>)))

                }
            )
        
    }
}

export const removeCharacteristicValueAction = (characteristicValue, characteristic) => {
    return dispatch => {

        dispatch({
            type: CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_VALUE,
            payload: characteristicValue
        })

        crudApi().removeCharacteristicValue( { id: characteristicValue.id } )
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_VALUE_FAILED,
                            payload: characteristicValue

                        })
                        dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>{ res.data.error }</label></div>)))

                        return
                    }

                    const response = {
                        characteristicValue: characteristicValue,
                        characteristic : characteristic
                    }

                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_VALUE_SUCCESS,
                        payload: response
                    })

                    dispatch(getProductsAction())

                }
            )
            .catch(
                err => {

                    dispatch({
                        type: CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_VALUE_FAILED,
                        payload: characteristicValue
                    })

                    console.log(err)
                    
                    dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>{ err.error }</label></div>)))

                }
            )
    }
}

export const insertCharacteristicValue = (charval) => {
    return dispatch => {
        dispatch({
            type: CHARACTERISTIC_ACTION_TYPES.INSERT_CHARACTERISTIC_VALUE,
            payload: charval
        })
    }
}