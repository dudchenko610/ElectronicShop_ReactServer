import { insertAt, removeByValue, replaceMapElementToTop } from "../../../../../../core/array-methods"
import {LOAD_STATES} from "../../../../../../core/load-states"
import {MESSAGE_ACTION_TYPES} from "../actions/message-actions"

export const messagesReducer = (state, action) => {


    switch(action.type) {

        case MESSAGE_ACTION_TYPES.GET_MESSAGES:
        {
            const getMessagesRequest = action.payload

            const contctInfo = getMessagesRequest.contactInfo
            const lastMessageId = getMessagesRequest.messageId

            const contactInfo = state.content.get(contctInfo.user.id)
            contactInfo.messagesModel.gettingMessageState = LOAD_STATES.LOADING
            contactInfo.hasMore = true

            const messagesModel = contactInfo.messagesModel

            if (messagesModel.messages.length == 0) {
                messagesModel.state = LOAD_STATES.LOADING
            }

            return true
        }

        case MESSAGE_ACTION_TYPES.GET_MESSAGES_SUCCESS:
        {
            const getMessagesResponse = action.payload
            
            const newMessages = getMessagesResponse.messages
            const hasMore = getMessagesResponse.hasMore

            const cntIf = getMessagesResponse.contactInfo
            const contactInfo = state.content.get(cntIf.user.id)

            newMessages.map((message, index, array) => {
                message.state = LOAD_STATES.READY
                message.statesHash = new Map()

                message.states.map((state, index_j, array_j) => {
                    message.statesHash.set(state.userId, state.read)
                })
                insertAt(contactInfo.messagesModel.messages, 0, message)
              //  contactInfo.messagesModel.messages.push(message)
            })

            
            const messagesModel = contactInfo.messagesModel

            if (messagesModel.messages.length > 0) {
                contactInfo.messagesModel.state = LOAD_STATES.READY
            } else {
                contactInfo.messagesModel.state = LOAD_STATES.NONE
            }

            contactInfo.messagesModel.gettingMessageState = LOAD_STATES.READY // orient on this while send next request
            contactInfo.messagesModel.hasMore = hasMore
            
            return true

        }
        
        case MESSAGE_ACTION_TYPES.GET_MESSAGES_FAILED:
        {
            const cnctInfo = action.payload

            //console.log(cnctInfo)
          //  console.log(state)

            const contactInfo = state.content.get(cnctInfo.user.id)
            contactInfo.messagesModel.gettingMessageState = LOAD_STATES.FAILED///

            const messagesModel = contactInfo.messagesModel

            if (messagesModel.messages.length == 0) {
                messagesModel.state = LOAD_STATES.FAILED
            }

            return true
        }
            


        case MESSAGE_ACTION_TYPES.SEND_MESSAGE:
        {
            const message = action.payload
            const contactInfo = state.content.get(message.receiverUserId)
            
            replaceMapElementToTop(state.content, contactInfo, contactInfo.user.id)

            if (!contactInfo.messagesModel.messages.includes(message)) {
                contactInfo.messagesModel.messages.push(message)
            }

            contactInfo.messagesModel.state = LOAD_STATES.READY

            message.state = LOAD_STATES.LOADING
            message.statesHash = new Map()

            message.statesHash.set(message.authorUserId, true)
            message.statesHash.set(message.receiverUserId, false)

           // console.log(message)

            return true
        }

        case MESSAGE_ACTION_TYPES.MESSAGE_SENT:
        {
            const data = action.payload

            const message = data.message
            const messageSentFeedback = data.messageSentFeedback
            const contactInfo = state.content.get(message.receiverUserId)

            if (message.wasFailed) {

                removeByValue(contactInfo.messagesModel.messages, message)
                contactInfo.messagesModel.messages.push(message)
            }

            message.state = LOAD_STATES.READY
            message.id = messageSentFeedback.messageId
            message.dateTime = messageSentFeedback.dateTime

            return true
        }
            
        case MESSAGE_ACTION_TYPES.MESSAGE_FAILED:
        {
            const message = action.payload
            message.state = LOAD_STATES.FAILED
            message.wasFailed = true

            return true
        }

        case MESSAGE_ACTION_TYPES.MESSAGE_CAME:
        {
            const data = action.payload
            const message = data.message
            const unreadCount = data.unreadCount

            message.state = LOAD_STATES.READY
            message.statesHash = new Map()

            message.statesHash.set(message.authorUserId, true)
            message.statesHash.set(message.receiverUserId, false) // receiverUserId - it is my id

            // for scrolling down
            message.came = true

            const contactInfo = state.content.get(message.authorUserId)
            contactInfo.messagesModel.messages.push(message)
            contactInfo.messagesModel.state = LOAD_STATES.READY
            contactInfo.unreadCount = unreadCount

            replaceMapElementToTop(state.content, contactInfo, contactInfo.user.id)
            

            return true
        }

        case MESSAGE_ACTION_TYPES.OPPOSITE_USER_READ_MY_MESSAGES:
        {
            const readMessagesData = action.payload

            const contactInfo = state.content.get( readMessagesData.oppositeUserId )

            contactInfo.messagesModel.messages.map((message, index, array) => {
                readMessagesData.messagesIds.map((messageId, ind, arr) => {
                    
                    if (message.id === messageId) {
                        message.statesHash.set(readMessagesData.oppositeUserId, true)
                    }
                })
            })

            console.log("OPPOSITE USER READ MY MESSAGES")

            return true
        }
            

        case MESSAGE_ACTION_TYPES.MESSAGES_WERE_READ:
        {
            const readMessagesData = action.payload.readMessagesData
            const myUserId = action.payload.myUserId

            const contactInfo = state.content.get( readMessagesData.authorUserId )
            contactInfo.unreadCount = readMessagesData.unreadMessagesAmount

            // O(N*M) - uneffective solution
            contactInfo.messagesModel.messages.map((message, index, array) => {

                readMessagesData.messagesIds.map((messageId, index, array) => {
                    if (message.id === messageId) {
                        message.statesHash.set(myUserId, true)
                    }
                })

            })

            return true

        }
            
            
        default:
            return false
    }

}