import React from "react"
import {store} from "../../../../index"

import {authApi} from "../../../../core/api"
import { hidePopupAction, showAlertPopupAction } from "../../../common/actions/popup-actions"
import { initSystemAuthAction, initSystemCommonAction } from "../../../common/actions/system-init-actions"

import {PopupListener} from "../../../../core/popup-utils"
import ProgressBar from "../../../common/components/ProgressBar"

export const LOGIN_ACTION_TYPES = {

    LOGIN_SUCCESS: "LOGIN_SUCCESS",

}

export const loginAction = (data, callbackFunc = null) => {

    return dispatch => {

        const loginModel = data.loginModel
        const onSuccess = data.onSuccess

        authApi().login(loginModel)
            .then(
                res => {

                    if (res.data.error) {
                        if (callbackFunc) {
                            callbackFunc.onError(res.data.error)
                        }

                        return
                    }

                    dispatch({
                        type: LOGIN_ACTION_TYPES.LOGIN_SUCCESS,
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
                        callbackFunc.onError(err.error)
                    }
                }
            );
    }

}


export const loginListener = (data) => {

    const loginListener = new PopupListener(
        <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>,
        { width: 400, height: 200},
    
        (errorMessage) => {
            return (
                <div>
                    <p>Login error</p>
                    <p>{errorMessage}</p>
        
                    <a onClick={() => {
                        loginListener.onRepeat()
                    }}>Repeat</a>
        
                    <a onClick={() => {
                        store.dispatch(loginListener.hide(loginListener.errorDiv))
                    }}>Cancel</a>
        
                </div>
            )
        },
        { width: 400, height: 200},
    
        hidePopupAction,
        showAlertPopupAction,
        loginAction,
        data
    
    )

    return loginListener

} 