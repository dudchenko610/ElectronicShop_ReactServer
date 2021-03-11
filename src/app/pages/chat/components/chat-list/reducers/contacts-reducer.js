import { replaceMapElementToTop } from "../../../../../../core/array-methods"

import {CONTACTS_LIST_ACTIONS} from "../actions/contacts-actions"

import {LOAD_STATES} from "../../../../../../core/load-states"
import { CONSOLE_ACTION_TYPES } from "../../../../console/actions/console-actions"

const initialChatModel = () => {
    return {
        contactInfo: null
    }
}


export const contactsReducer = (state, action) => {

    switch (action.type) {

        case CONTACTS_LIST_ACTIONS.GET_CONTACTS:

            state.currentChatModel = initialChatModel()
            state.content.clear()
            state.state = LOAD_STATES.LOADING

            return true

        case CONTACTS_LIST_ACTIONS.GET_CONTACTS_FAILED:

            state.currentChatModel = initialChatModel()

            state.content.clear()
            state.state = LOAD_STATES.FAILED

            return true

        case CONTACTS_LIST_ACTIONS.GET_CONTACTS_SUCCESS:

            const contactInfos = action.payload

            state.currentChatModel = initialChatModel()

            contactInfos.sort((a, b) => {
                return b.millisecondsSince1970 - a.millisecondsSince1970
            }) 

            contactInfos.map((contactInfo, index, array) => {
                contactInfo.state = LOAD_STATES.READY

                if (state.content.has(contactInfo.user.id)) {
                    state.content.delete(contactInfo.user.id)
                }

                state.content.set(contactInfo.user.id, contactInfo)

                contactInfo.messagesModel = {
                    state: LOAD_STATES.NONE,
                    messages: [],
                    hasMore: true
                }

                return contactInfo
            })

            

            if (contactInfos.length == 0) {
                state.state = LOAD_STATES.NONE
            } else {
                state.state = LOAD_STATES.READY
            }

            

            return true

        case CONTACTS_LIST_ACTIONS.GET_CONTACT:
        {
            return true
        }

        case CONTACTS_LIST_ACTIONS.GET_CONTACT_FAILED:
        {
            return true
        }

        case CONTACTS_LIST_ACTIONS.GET_CONTACT_SUCCESS:
        {
            const contactInfo = action.payload

            contactInfo.state = LOAD_STATES.READY

            if (state.content.has(contactInfo.user.id)) {
                state.content.delete(contactInfo.user.id)
            }

            // place on top of map
            replaceMapElementToTop(state.content, contactInfo, contactInfo.user.id)

            contactInfo.messagesModel = {
                state: LOAD_STATES.NONE,
                messages: [],
                hasMore: true
            }

            return true
        }



        case CONTACTS_LIST_ACTIONS.UPDATE_CONTACT_REDUCER:
         //  const contactInfo = action.payload

            return true
    
            
        case CONTACTS_LIST_ACTIONS.PICK_UP_CONTACT:

            const contactInfo = action.payload


            if (state.currentChatModel.contactInfo === contactInfo) {
                state.currentChatModel.contactInfo = null
            } else {
                state.currentChatModel.contactInfo = contactInfo
            }

            if (state.currentChatModel.contactInfo) {
                state.currentChatModel.contactInfo.messagesModel = {
                    state: LOAD_STATES.NONE,
                    messages: [],
                    hasMore: true
                }
            }
    
            return true

        case CONTACTS_LIST_ACTIONS.INSERT_CONTACT:
            const user = action.payload

            if (!state.content.has(user.id)) {
                const contactInfo = {
                    user: user,
                    unreadCount: 0
                }

                contactInfo.messagesModel = {
                    state: LOAD_STATES.NONE,
                    messages: [],

                    hasMore: true
                }
    
                state.content.set(user.id, contactInfo)
            }

            state.state = LOAD_STATES.READY

            console.log(user)
            console.log(state.content)


            return true

        default:
            return false

    }

    

}