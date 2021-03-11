import {store} from "../../../../../../index"
import {chatApi} from "../../../../../../core/api"

import { getContactAction } from "../../chat-list/actions/contacts-actions"

export const MESSAGE_ACTION_TYPES = {

    MESSAGE_CAME: "MESSAGE_CAME",
    OPPOSITE_USER_READ_MY_MESSAGES: "OPPOSITE_USER_READ_MY_MESSAGES",

    READ_MESSAGES : "READ_MESSAGES",
    MESSAGES_WERE_READ : "MESSAGES_WERE_READ",

    SEND_MESSAGE: "SEND_MESSAGE",
    MESSAGE_SENT: "MESSAGE_SENT",
    MESSAGE_FAILED: "MESSAGE_FAILED",

    GET_MESSAGES: "GET_MESSAGES",
    GET_MESSAGES_SUCCESS: "GET_MESSAGES_SUCCESS",
    GET_MESSAGES_FAILED: "GET_MESSAGES_FAILED"
}

// PROBLEM IF NO USER IN STORAGE
export const onMessageCameAction = (data) => { // { message, unreadCount }
    return dispatch => {

        console.log(data)

        const state = store.getState()
        const contactInfos = state.chatReducer.content

        if (contactInfos.has(data.message.authorUserId)) {
            dispatch({
                type: MESSAGE_ACTION_TYPES.MESSAGE_CAME,
                payload: data
            })
    
            const currentChatModel = state.chatReducer.currentChatModel
    
            if (!currentChatModel.contactInfo) {
                return
            }
    
            const oppositeUser = currentChatModel.contactInfo.user
            const message = data.message
    
            if (oppositeUser.id === message.authorUserId) {
                dispatch(readMessagesAction([ message ], currentChatModel.contactInfo))
            }
        } else {
            const user = {
                id: data.message.authorUserId
            }
            dispatch(getContactAction(user))
        }

        
        
    }
}

export const onOppositeUserReadMyMessagesAction = (data) => {
    return dispatch => {


        dispatch({
            type: MESSAGE_ACTION_TYPES.OPPOSITE_USER_READ_MY_MESSAGES,
            payload: data
        })

        
    }
}


// MESSAGE HANDLING STUFF
export const getMessagesAction = (getMessagesRequest) => {
    return dispatch => {

       // console.log(getMessagesRequest)

        dispatch({
            type: MESSAGE_ACTION_TYPES.GET_MESSAGES,
            payload: getMessagesRequest
        })

        chatApi().getMessages(getMessagesRequest)
            .then(
                res => {

                    if (res.data.error) {

                        console.log(getMessagesRequest)

                        dispatch({
                            type: MESSAGE_ACTION_TYPES.GET_MESSAGES_FAILED,
                            payload: getMessagesRequest.contactInfo
                        })

                        return
                    }

                    const getMessagesResponse = res.data
                    getMessagesResponse.contactInfo = getMessagesRequest.contactInfo

                   // console.log(getMessagesResponse)


                    dispatch({
                        type: MESSAGE_ACTION_TYPES.GET_MESSAGES_SUCCESS,
                        payload: getMessagesResponse
                    })

                    // read unread messages
                    const newMessages = getMessagesResponse.messages
                    const oppositeContactInfo = getMessagesResponse.contactInfo

                    dispatch(readMessagesAction(newMessages, oppositeContactInfo))

                }
            )
            .catch(
                err => {

                    console.log(err)

                    dispatch({
                        type: MESSAGE_ACTION_TYPES.GET_MESSAGES_FAILED,
                        payload: getMessagesRequest.contactInfo
                    })
                }
            )
    }
}

export const resendMessageAction = (message) => {
    return dispatch => {

        const state = store.getState()
        const hubConnection = state.signalRReducer.hubConnection

        dispatch({
            type: MESSAGE_ACTION_TYPES.SEND_MESSAGE,
            payload: message
        })


        try {
            const messageSentFeedbackPromise = hubConnection.invoke("SendMessage", message); // should be blocking
            
            messageSentFeedbackPromise
                .then(
                    feedback => {

                        const data = {
                            message: message,
                            messageSentFeedback: feedback
                        }

                        dispatch({
                            type: MESSAGE_ACTION_TYPES.MESSAGE_SENT,
                            payload: data
                        })
                    },
                    err => {
                        
                        console.log(err)
                        dispatch({
                            type: MESSAGE_ACTION_TYPES.MESSAGE_FAILED,
                            payload: message
                        })
                    }
                )

            

        } catch {

            console.log("catch")

            dispatch({
                type: MESSAGE_ACTION_TYPES.MESSAGE_FAILED,
                payload: message
            });
        }

    }
}

export const sendMessageAction = (content, receiverUserId) => {
    return dispatch => {

        console.log(receiverUserId)

        const state = store.getState()

        const myUser = state.meuserReducer.user

        console.log(myUser)

        const contactInfo = state.chatReducer.content.get(receiverUserId)
        const receiverUser = contactInfo.user

        console.log(contactInfo)

        
        const message = {
            authorUserId: myUser.id,
            authorUserName: myUser.userName,

            receiverUserId: receiverUser.id,
            receiverUserName: receiverUser.userName,

            content: content
        }

        console.log(message)

        dispatch(resendMessageAction(message))
        
    }
}

export const readMessagesAction = (messages, contactInfo) => {
    return dispatch => {

        const state = store.getState()
        const hubConnection = state.signalRReducer.hubConnection  

        const myUserId = state.meuserReducer.user.id

        const unreadMessagesIds = []

        messages.map((message, index, array) => {

            if (!message.statesHash.get(myUserId)) {
                unreadMessagesIds.push(message.id)
            }

        })

        console.log(messages)
        console.log(unreadMessagesIds)


        if (unreadMessagesIds.length === 0) {
            return
        }
        
        const user = contactInfo.user
        
        const readMessagesData = {
            messagesIds : unreadMessagesIds,
            authorUserId : user.id,
            authorUserName : user.userName,
        }

        console.log("readMessagesData")
        console.log(readMessagesData)

        const messagesReadData = hubConnection.invoke("ReadMessages", readMessagesData);

        messagesReadData
            .then(
                res => {

                    const readMessagesData = res

                    const data = {
                        readMessagesData : readMessagesData,
                        myUserId: myUserId
                    }

                    dispatch({
                        type: MESSAGE_ACTION_TYPES.MESSAGES_WERE_READ,
                        payload: data
                    })

                },
                err => {
                    console.log("Unable to read unread messges")
                    console.log(err)                
                
                }
            )
    }
    
}

