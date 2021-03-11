import {store} from "../../../../index"

import {getContactsAction} from "../components/chat-list/actions/contacts-actions"
import {onMessageCameAction, onOppositeUserReadMyMessagesAction} from "../components/messages/actions/message-actions"

export const initChatSystemAction = () => {
    return dispatch => {
        const state = store.getState()
        const signalRReducer = state.signalRReducer

        dispatch(getContactsAction())
    
        
        signalRReducer.hubConnection.on("ReceiveMessage", message => {
            dispatch(onMessageCameAction(message))
        })

        signalRReducer.hubConnection.on("OppositeUserReadMessages", data => {
            dispatch(onOppositeUserReadMyMessagesAction(data))
        })
        
    }
}
