import {store} from "../../../../../../index"
import {chatApi} from "../../../../../../core/api"


import {getMessagesAction} from "../../messages/actions/message-actions"
import { downloadImageAction } from "../../../../../common/components/image/actions/image-actions"
import { LOAD_STATES } from "../../../../../../core/load-states"
import { ImageModel } from "../../../../../common/components/image/data-model/ImageModel"
import { PathModel } from "../../../../../common/components/image/data-model/PathModel"

const no_avatar = require("../../../../../../media/no-avatar.png");
const no_avatarWidth = 256
const no_avatarHeight = 256

export const CONTACTS_LIST_ACTIONS = {

    GET_CONTACTS: "GET_CONTACTS",
    GET_CONTACTS_SUCCESS: "GET_CONTACTS_SUCCESS",
    GET_CONTACTS_FAILED: "GET_CONTACTS_FAILED",

    GET_CONTACT: "GET_CONTACT",
    GET_CONTACT_SUCCESS: "GET_CONTACT_SUCCESS",
    GET_CONTACT_FAILED: "GET_CONTACT_FAILED",

    UPDATE_CONTACT_REDUCER: "UPDATE_CONTACT_REDUCER",

    PICK_UP_CONTACT: "PICK_UP_CONTACT",
    INSERT_CONTACT: "INSERT_CONTACT"
}

export const pickUpContactAction = (contactInfo) => {
    return dispatch => {
        const state = store.getState()

        dispatch({
            type: CONTACTS_LIST_ACTIONS.PICK_UP_CONTACT,
            payload: contactInfo
        })
        
     /*   const opositeUserData = state.userDataReducer.userDatas.get(userId)
        dispatch(getMessagesAction(opositeUserData))*/
       
    }
}

export const insertContactAction = (user, pickUpThis = null) => {
    return dispatch => {
        dispatch({
            type: CONTACTS_LIST_ACTIONS.INSERT_CONTACT,
            payload: user
        })

        if (pickUpThis) {
            const state = store.getState()
            const contactInfo = state.chatReducer.content.get(user.id)

            dispatch(pickUpContactAction(contactInfo))
        }
    }
}

export const getContactAction = (user) => {

    console.log(user)

    return dispatch => {
        dispatch({
            type: CONTACTS_LIST_ACTIONS.GET_CONTACT
        })

        chatApi().getMyContact(user)
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: CONTACTS_LIST_ACTIONS.GET_CONTACT_FAILED,
                            payload: res.data.error
                        })

                        return
                    }
                    

                    const contactInfo = res.data
                    
                  //  console.log("getContactAction")
                  //  console.log(contactInfo)

                    const user = contactInfo.user

                    const imageModel = new ImageModel()

                    imageModel.noImg = no_avatar
                    imageModel.noImgWidth = no_avatarWidth
                    imageModel.noImgHeight = no_avatarHeight

                    imageModel.updateReducerConst = CONTACTS_LIST_ACTIONS.UPDATE_CONTACT_REDUCER
                    imageModel.updateReducerPayload = contactInfo
                    imageModel.isAuth = false
                    imageModel.state = LOAD_STATES.NONE

                    user.imageModel = imageModel

                    if (user.avatarFileName) {

                        const pathModel = new PathModel("profiles/" + user.id + "/avatar", user.avatarFileName)
                        imageModel.pathModel = pathModel

                        dispatch(downloadImageAction(imageModel))

                    }

                    

                    dispatch({
                        type: CONTACTS_LIST_ACTIONS.GET_CONTACT_SUCCESS,
                        payload: contactInfo
                    })

                    
                }
            )
            .catch(
                err => {

                    console.log(err)

                    dispatch({
                        type: CONTACTS_LIST_ACTIONS.GET_CONTACT_FAILED,
                        payload: "Server is unavailable"
                    })
                }
            )
    }
}

export const getContactsAction = () => {
    return dispatch => {
        
        dispatch({
            type: CONTACTS_LIST_ACTIONS.GET_CONTACTS
        })

        chatApi().getMyContacts()
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: CONTACTS_LIST_ACTIONS.GET_CONTACTS_FAILED,
                            payload: res.data.error
                        })

                        return
                    }
                    

                    const contactInfos = res.data
                    
                    console.log(contactInfos)

                    contactInfos.map((contactInfo, index, array) => {
                        const user = contactInfo.user

                        const imageModel = new ImageModel()

                        imageModel.noImg = no_avatar
                        imageModel.noImgWidth = no_avatarWidth
                        imageModel.noImgHeight = no_avatarHeight

                        imageModel.updateReducerConst = CONTACTS_LIST_ACTIONS.UPDATE_CONTACT_REDUCER
                        imageModel.updateReducerPayload = contactInfo
                        imageModel.isAuth = false
                        imageModel.state = LOAD_STATES.NONE

                        user.imageModel = imageModel

                        if (user.avatarFileName) {

                            const pathModel = new PathModel("profiles/" + user.id + "/avatar", user.avatarFileName)
                            imageModel.pathModel = pathModel

                            dispatch(downloadImageAction(imageModel))

                        }

                        return contactInfo
                    })

                    

                    dispatch({
                        type: CONTACTS_LIST_ACTIONS.GET_CONTACTS_SUCCESS,
                        payload: contactInfos
                    })

                    
                }
            )
            .catch(
                err => {
                    dispatch({
                        type: CONTACTS_LIST_ACTIONS.GET_CONTACTS_FAILED,
                        payload: "Server is unavailable"
                    })
                }
            )

    }
}