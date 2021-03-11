import React from "react"
import {store} from "../../../../index"

import {authApi} from "../../../../core/api"
import { hidePopupAction, showAlertPopupAction } from "../../../common/actions/popup-actions"
import { initSystemAuthAction, initSystemCommonAction } from "../../../common/actions/system-init-actions"

import {PopupListener} from "../../../../core/popup-utils"
import ProgressBar from "../../../common/components/ProgressBar"

export const REGISTER_ACTION_TYPES = {

    REGISTER_SUCCESS: "REGISTER_SUCCESS",

}


export const registerAction = (data, callbackFunc = null) => {
    return dispatch => {

        const registerModel = data.registerModel
        const onSuccess = data.onSuccess

        authApi().register(registerModel)
            .then(
                res => {

                    if (res.data.error) {
                        if (callbackFunc) {
                            callbackFunc.onError(res.data.error)
                        }

                        return
                    }

                    dispatch({
                        type: REGISTER_ACTION_TYPES.REGISTER_SUCCESS,
                        payload: res.data
                    });

                    onSuccess()

                    if (callbackFunc) {
                        callbackFunc.onSuccess()
                    }

                    dispatch(initSystemAuthAction())
                    dispatch(initSystemCommonAction())
                }
            )
            .catch(
                err => {
                    if (callbackFunc) {
                        callbackFunc.onError(err)
                    }
                }
            );
    }

}

export const registerListener = (data) => {

    const registerListener = new PopupListener(
        <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>,
        { width: 400, height: 200},
    

        (errorMessage) => {
            return (
                <div>
                    <p>Register error</p>
                    <p>{errorMessage}</p>

                    <a onClick={() => {
                        registerListener.onRepeat()
                    }}>Repeat</a>

                    <a onClick={() => {
                        store.dispatch(registerListener.hide(registerListener.errorDiv))
                    }}>Cancel</a>

                </div>
            )
        },
        { width: 400, height: 200},
    
        hidePopupAction,
        showAlertPopupAction,
        registerAction,
        data
    
    )

    return registerListener

} 