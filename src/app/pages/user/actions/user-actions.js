import {store} from "../../../../index"
import { authApi } from "../../../../core/api"

import { LOAD_STATES } from "../../../../core/load-states"

import { downloadImageAction } from "../../../common/components/image/actions/image-actions"
import { ImageModel } from "../../../common/components/image/data-model/ImageModel"
import { PathModel } from "../../../common/components/image/data-model/PathModel"

const no_avatar = require("../../../../media/no-avatar.png");
const no_avatarWidth = 256
const no_avatarHeight = 256

export const USER_ACTION_TYPES = {

    GET_USER: "GET_USER",
    GET_USER_SUCCESS: "GET_USER_SUCCESS",
    GET_USER_FAILED: "GET_USER_FAILED",

    GET_USERS: "GET_USERS",
    GET_USERS_SUCCESS: "GET_USERS_SUCCESS",
    GET_USERS_FAILED: "GET_USERS_FAILED",

    INSERT_USER: "INSERT_USER",

    UPDATE_USERS_REDUCER : "UPDATE_USERS_REDUCER"

}



export const insertUserAction = (user) => {
    return dispatch => {

        const state = store.getState()
        const userDatas = state.userDataReducer.userDatas

        if (!userDatas.has(user.id)) {

            dispatch({
                type: USER_ACTION_TYPES.INSERT_USER,
                payload : user
            })

         //   dispatch(downloadUserAvatarAction(user))

        }
        
    }
}

export const getUsersAction = (paginationFilter, userFilter) => {
    return dispatch => {

        dispatch({
            type: USER_ACTION_TYPES.GET_USERS,
            payload: {
                paginationFilter: {
                    ...paginationFilter
                },
                userFilter: {
                    ...userFilter
                }
            }
        })

        
        authApi().getUsers(paginationFilter, userFilter)
            .then(
                res => {
                    if (res.data.error) {
                        console.log("USERS WERE NOT GOT")
                        console.log(res.data.error)

                        dispatch({
                            type: USER_ACTION_TYPES.GET_USERS_FAILED
                        })

                        return
                    }


                    const pagedData = res.data
                    const users = pagedData.data

                    users.map((user, index, array) => {
                        
                        
                        const imageModel = new ImageModel()

                        imageModel.noImg = no_avatar
                        imageModel.noImgWidth = no_avatarWidth
                        imageModel.noImgHeight = no_avatarHeight

                        imageModel.updateReducerConst = USER_ACTION_TYPES.UPDATE_USERS_REDUCER
                        imageModel.updateReducerPayload = user
                        imageModel.isAuth = false
                        imageModel.state = LOAD_STATES.NONE

                        user.imageModel = imageModel

                        if (user.avatarFileName) {

                            const pathModel = new PathModel("profiles/" + user.id + "/avatar", user.avatarFileName)
                            imageModel.pathModel = pathModel

                            dispatch(downloadImageAction(imageModel))

                        }

                        return user

                    })  

                    dispatch({
                        type: USER_ACTION_TYPES.GET_USERS_SUCCESS,
                        payload: pagedData
                    })

                }
            )
            .catch(
                err => {
                    console.log("USERS WERE NOT GOT")
                    console.log(err)

                    dispatch({
                        type: USER_ACTION_TYPES.GET_USERS_FAILED
                    })
                }
            )
            
    }
}

export const getUserAction = (userId, callback = null) => {
    return dispatch => {

        dispatch({
            type: USER_ACTION_TYPES.GET_USER
        })

        console.log(userId)

        authApi().getUser(userId)
            .then(
                res => {

                    console.log(res)

                    if (res.data.error) {

                        dispatch({
                            type: USER_ACTION_TYPES.GET_USER_FAILED,
                            payload: {}
                        })

                        if (callback) {
                            callback.onError()
                        }
                        

                        return
                    }

                    const user = res.data

                    // avatar photo

                    const imageModel = new ImageModel()

                    imageModel.noImg = no_avatar
                    imageModel.noImgWidth = no_avatarWidth
                    imageModel.noImgHeight = no_avatarHeight

                    imageModel.updateReducerConst = USER_ACTION_TYPES.UPDATE_USERS_REDUCER
                    imageModel.updateReducerPayload = user
                    imageModel.isAuth = false
                    imageModel.state = LOAD_STATES.NONE

                    user.imageModel = imageModel

                    if (user.avatarFileName) {

                        const pathModel = new PathModel("profiles/" + user.id + "/avatar", user.avatarFileName)
                        imageModel.pathModel = pathModel

                        dispatch(downloadImageAction(imageModel))
                    }

                    dispatch({
                        type: USER_ACTION_TYPES.GET_USER_SUCCESS,
                        payload: user
                    })

                    if (callback) {
                        callback.onSuccess(user) //  callback.onSuccess()
                    }

                }
            )
            .catch(
                err => {
                  //  console.log(err)

                    dispatch({
                        type: USER_ACTION_TYPES.GET_USER_FAILED
                    })

                    if (callback) {
                        callback.onError()
                    }
                }
            )
    }
}

