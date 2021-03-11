import {contactsReducer} from "../components/chat-list/reducers/contacts-reducer"
import {messagesReducer} from "../components/messages/reducers/messages-reducer"

import { LOAD_STATES } from "../../../../core/load-states"

const initialState = () => {
    return {

        currentChatModel: 
        {
            contactInfo: null
        },

        content: new Map(), // contactInfos
        state: LOAD_STATES.NONE,
        
    }
}

export const chatReducer = (state = initialState(), action) => {

    if (contactsReducer(state, action)  | messagesReducer(state, action) ) {
        return {
            ...state
        }
    }

    return state

}