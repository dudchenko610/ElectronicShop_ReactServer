import React from "react"

import {POPUP_ACTION_TYPES} from "../actions/popup-actions"

const defaultStyle = {
    width: 400,
    height: 200
}

const message = {
    popupState : POPUP_ACTION_TYPES.POPUP_HIDDEN,
    popupDiv : (<p>Initial text</p>),
    popupStyle: defaultStyle,
}

const initialState = {
    messages : [],
    currentState: POPUP_ACTION_TYPES.POPUP_HIDDEN
}


export const popupReducer = (state = initialState, action)  => {

    switch(action.type) {
        case POPUP_ACTION_TYPES.POPUP_HIDDEN:

         //   console.log("hide")

            const popupDiv = action.payload
            var ind = null

            state.messages.map((message, index, array) => {
                
                if (message.popupDiv === popupDiv) {
                    ind = index
                }
            }) 

            state.messages.splice(ind, 1)
            
          //  state.messages.pop()

            return {
                ...state
            }

        case POPUP_ACTION_TYPES.POPUP_WAITING:  

            const message = {
                popupState : action.type,
                popupDiv : action.payload.div,
                popupStyle : defaultStyle
            }

            state.messages.unshift(message)

            return {
                ...state
            }

        case POPUP_ACTION_TYPES.POPUP_ALERT:
        case POPUP_ACTION_TYPES.POPUP_ALERT_X:  

            const msg = {
                popupState : action.type,
                popupDiv : action.payload.div,
                popupStyle : action.payload.popupStyle
            }

            state.messages.unshift(msg)

            return {
                ...state
            }

        case POPUP_ACTION_TYPES.POPUP_UPDATE:

            return {
                ...state
            }
            
        default:
            return state
        
    }

    
}