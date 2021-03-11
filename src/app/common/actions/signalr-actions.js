import React from "react"
import { HubConnectionBuilder } from '@microsoft/signalr';
import { store } from "../../../index"

import { getAuthToken } from "../reducers/meuser-reducer"

import {PopupListener} from "../../../core/popup-utils"
import {showAlertPopupAction, hidePopupAction} from "../actions/popup-actions"
import ProgressBar from "../components/ProgressBar"

import {baseUrl} from "../../../core/api"

import {initChatSystemAction} from "../../pages/chat/actions/chat-actions"

export const SIGNALR_ACTION_TYPES = {
    INIT_SIGNALR : "INIT_SIGNALR",
    INIT_SIGNALR_SUCCESS : "INIT_SIGNALR_SUCCESS",
    INIT_SIGNALR_FAILED : "INIT_SIGNALR_FAILED",

    INIT_SIGNALR_DISCONNECTED : "INIT_SIGNALR_DISCONNECTED"
}


export const initSignalRAction = (callbackFunc = null) => {
    return dispatch => {

        const state = store.getState()

        const token = getAuthToken()
        
        console.log(`${(baseUrl + "chatting")}?token=${token}`)

        const hubConnection = new HubConnectionBuilder()
            .withUrl(`${(baseUrl + "chatting")}?token=${token}`)
          //  .withUrl(baseUrl + "chatting",  { accessTokenFactory: () => state.authState.authToken })
            .withAutomaticReconnect()
            .build();


        hubConnection.onreconnecting((err) => {
            console.log('CONNECTION CLOSED')
            
            dispatch({
                type: SIGNALR_ACTION_TYPES.INIT_SIGNALR_DISCONNECTED
            })

            if (callbackFunc) {
                callbackFunc.onError("Connection was interrupted")
            }

        })

        dispatch(
            () => new Promise((resolve, reject) => {
                dispatch({
                    type: SIGNALR_ACTION_TYPES.INIT_SIGNALR
                });

            resolve()
            })
        )
        .then(
            hubConnection.start()
            .then(
                () => {
                    console.log('Connection started!')

                    dispatch({
                        type: SIGNALR_ACTION_TYPES.INIT_SIGNALR_SUCCESS,
                        payload: hubConnection
                    });

                    if (callbackFunc) {
                        callbackFunc.onSuccess()
                    }

                    dispatch(initChatSystemAction())
                }
            )
            .catch(
                err => {
                   // console.log('Error while establishing connection :(')
                    console.log(err)

                    dispatch({
                        type: SIGNALR_ACTION_TYPES.INIT_SIGNALR_FAILED
                    })

                    if (callbackFunc) {
                        callbackFunc.onError("Error while connection")
                    }
                }
            )
        )

    
    }
}

export const signalRListener = () => {
    const signalRListener = new PopupListener(
        <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>,
        { width: 400, height: 200},
    
        (errorMessage) => {
            return (
                <div>
                    <p>Signal R init error</p>
                    <p>{errorMessage}</p>
        
                    <a onClick={() => {
                        signalRListener.onRepeat()
                    }}>Repeat</a>
        
                    <a onClick={() => {
                        store.dispatch(signalRListener.hide(signalRListener.errorDivWithError))
                    }}>Cancel</a>
        
                </div>
            )
        },
        { width: 400, height: 200},
    
        hidePopupAction,
        showAlertPopupAction,
        initSignalRAction
    
    )

    return signalRListener
}