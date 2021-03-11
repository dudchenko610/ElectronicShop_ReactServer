import React from "react"
import {authApi} from "../../../core/api"
import {store} from "../../../index"

import { ImageModel } from "../components/image/data-model/ImageModel"
import { PathModel } from "../components/image/data-model/PathModel"

import { uploadAvatarApi } from "../../../core/api"
import { showAlertPopupAction, hidePopupAction } from "../actions/popup-actions"
import { downloadImageAction } from "../components/image/actions/image-actions"

import { PopupListener } from "../../../core/popup-utils"
import ProgressBar from "../components/ProgressBar"
import { LOAD_STATES } from "../../../core/load-states"

export const PROFILE_ACTION_TYPES = {

    LOGOUT: "LOGOUT",
    
    GET_USER: "GET_ME_USER",
    GET_USER_SUCCESS: "GET_ME_USER_SUCCESS",
    GET_USER_FAILED: "GET_ME_USER_FAILED",


    UPDATE_USER_SUCCESS: "UPDATE_ME_USER_SUCCESS",

    UPDATE_PROFILE_REDUCER: "UPDATE_PROFILE_REDUCER"

}

const no_avatar = require("../../../media/no-avatar.png");
const no_avatarWidth = 256
const no_avatarHeight = 256

// GET USER
export const getUserAction = (callbackFunc = null) => {
    return dispatch => {

        dispatch({
            type: PROFILE_ACTION_TYPES.GET_USER
        })

        authApi().getMeUser()
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: PROFILE_ACTION_TYPES.GET_USER_FAILED
                        })

                        if (callbackFunc) {
                            callbackFunc.onError(res.data.error)
                        }

                        return
                    }

                    const userRole = res.data

                    console.log(userRole)

                    const pathModel = new PathModel("profiles/" + userRole.user.id + "/avatar", userRole.user.avatarFileName)
                    userRole.avatarModel = new ImageModel(
                        no_avatar,
                        uploadAvatarApi,
                        PROFILE_ACTION_TYPES.UPDATE_PROFILE_REDUCER,
                        pathModel,
                        false
                    )

                    userRole.avatarModel.noImgWidth = no_avatarWidth
                    userRole.avatarModel.noImgHeight = no_avatarHeight
                    userRole.avatarModel.state = LOAD_STATES.NONE

                    if (callbackFunc) {
                        callbackFunc.onSuccess()
                    }

                    console.log(userRole.avatarModel)

                    dispatch({
                        type: PROFILE_ACTION_TYPES.GET_USER_SUCCESS,
                        payload: userRole
                    })

                    

                    if (userRole.user.avatarFileName) {

                        console.log("dispatch download avatar")

                        dispatch(downloadImageAction(userRole.avatarModel))
                    }


                }
            )
            .catch(
                err => {

                  
                    dispatch({
                        type: PROFILE_ACTION_TYPES.GET_USER_FAILED
                    })

                    if (callbackFunc) {
                        callbackFunc.onError("Pzdz")
                    }
                }
            )
    }
}


// LOGOUT
export const logoutAction = () => {

    return dispatch => {
        dispatch({
            type: PROFILE_ACTION_TYPES.LOGOUT,
        })
    //    dispatch(switchToHomePageAction())
    }


}


export const userListener = () => {

    const userListener = new PopupListener(
        <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>,
        { width: 400, height: 200},
    
        (errorMessage) => {
            return (
                <div>
                    <p>Get user error</p>
                    <p>{errorMessage}</p>
        
                    <a onClick={() => {
                        userListener.onRepeat()
                    }}>Repeat</a>
        
                    <a onClick={() => {
                        store.dispatch(userListener.hide(userListener.errorDivWithError))
                        store.dispatch(logoutAction())
                    }}>Logout</a>
        
                </div>
            )
        },
        { width: 400, height: 200},
    
        hidePopupAction,
        showAlertPopupAction,
        getUserAction
    
    )

    return userListener

} 