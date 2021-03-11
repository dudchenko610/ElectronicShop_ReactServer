import React from "react"
import {store} from "../../../../index"
import {authApi} from "../../../../core/api"

import {hidePopupAction, showAlertPopupAction} from "../../../common/actions/popup-actions"

import {PROFILE_ACTION_TYPES} from "../../../common/actions/meuser-actions"


import {PopupListener} from "../../../../core/popup-utils"
import ProgressBar from "../../../common/components/ProgressBar"


export const updateUserAction = (updatedModel, callbackFunc = null) => {
    return dispatch => {

        authApi().updateUser(updatedModel)
            .then(
                res => {

                    if (res.data.error) {

                        if (callbackFunc) {
                            callbackFunc.onError(res.data.error)
                        }

                        return 
                    }

                    dispatch(hidePopupAction())

                    dispatch(
                        {
                            type: PROFILE_ACTION_TYPES.UPDATE_USER_SUCCESS,
                            payload: updatedModel
                        }
                    )

                    if (callbackFunc) {
                        callbackFunc.onSuccess()
                    }

                }
            )
            .catch(
                err => {

                    if (callbackFunc) {
                        callbackFunc.onError(err)
                    }
                }
            )
    }
}



export const profileSettingsListener = (data) => {

    const profileSettingsListener = new PopupListener(
        <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>,
        { width: 400, height: 200},
    
        (errorMessage) => {
            return (
                <div>
                    <p>Save profile settings error</p>
                    <p>{ errorMessage }</p>
        
                    <a onClick={(event) => {
                        profileSettingsListener.onRepeat()
                    }}>Repeat</a>
        
                    <a onClick={(event) => {
                        store.dispatch(profileSettingsListener.hide(profileSettingsListener.errorDiv))
                    }}>Cancel</a>
        
                </div>
            )
        }
        ,
        { width: 400, height: 200},
    
        hidePopupAction,
        showAlertPopupAction,
        updateUserAction,
        data
    
    )

    return profileSettingsListener

} 