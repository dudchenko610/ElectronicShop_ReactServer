import {crudApi} from "../../../../../core/api"
import { LOAD_STATES } from "../../../../../core/load-states";
import {store} from "../../../../../index"
import { downloadImageAction } from "../../../components/image/actions/image-actions";
import { ImageModel } from "../../../components/image/data-model/ImageModel";
import { PathModel } from "../../../components/image/data-model/PathModel";

const no_avatar = require("../../../../../media/no-avatar.png");
const no_avatarWidth = 256
const no_avatarHeight = 256

export const COMMENT_ACTION_TYPES = {

    GET_COMMENTS: "GET_COMMENTS",
    GET_COMMENTS_SUCCESS: "GET_COMMENTS_SUCCESS",
    GET_COMMENTS_FAILED: "GET_COMMENTS_FAILED",

    ADD_COMMENT: "ADD_COMMENT",
    ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
    ADD_COMMENT_FAILED: "ADD_COMMENT_FAILED",

    REMOVE_COMMENT: "REMOVE_COMMENT",
    REMOVE_COMMENT_SUCCESS: "REMOVE_COMMENT_SUCCESS",
    REMOVE_COMMENT_FAILED: "REMOVE_COMMENT_FAILED",

    RESET_COMMENT_REDUCER: "RESET_COMMENT_REDUCER",
    UPDATE_COMMENT_REDUCER: "UPDATE_COMMENT_REDUCER"

}

export const addCommentAction = ( content, productId ) => {
    return dispatch => {

        const comment = {
            content: content,
            productId: productId
        }

        const state = store.getState()
        const meuserReducer = state.meuserReducer

        const sndComm = {
            ...comment
        }

        comment.user = {
            ...meuserReducer.user,
            imageModel: meuserReducer.avatarModel
        }

        console.log(comment)

        dispatch({
            type: COMMENT_ACTION_TYPES.ADD_COMMENT,
            payload: comment
        })

        crudApi().addComment(sndComm)
            .then(
                res => {
                    if (res.data.error) {

                        dispatch({
                            type: COMMENT_ACTION_TYPES.ADD_COMMENT_FAILED,
                            payload: comment
                        })

                        return
                    }

                    const newComment = res.data
                    comment.id = newComment.id

                    dispatch({
                        type: COMMENT_ACTION_TYPES.ADD_COMMENT_SUCCESS,
                        payload: comment
                    })

                }
            )
            .catch(
                err => {
                    dispatch({
                        type: COMMENT_ACTION_TYPES.ADD_COMMENT_FAILED,
                        payload: comment
                    })
                }
            )
    }
}

export const removeCommentAction = ( commentId ) => {
    return dispatch => {
        const comment = {
            id: commentId
        }

        dispatch({
            type: COMMENT_ACTION_TYPES.REMOVE_COMMENT,
            payload: commentId
        })

        crudApi().removeComment(comment)
            .then(
                res => {
                    if (res.data.error) {

                        dispatch({
                            type: COMMENT_ACTION_TYPES.REMOVE_COMMENT_FAILED,
                            payload: commentId
                        })

                        return
                    }

                    dispatch({
                        type: COMMENT_ACTION_TYPES.REMOVE_COMMENT_SUCCESS,
                        payload: commentId
                    })

                }
            )
            .catch(
                err => {
                    dispatch({
                        type: COMMENT_ACTION_TYPES.REMOVE_COMMENT_FAILED,
                        payload: commentId
                    })
                }
            )
    }
}



export const getCommentsAction = ( productId, lastCommentId = 0 ) => {
    return dispatch => {

        const filter = {
            productId: productId,
            lastCommentId: lastCommentId
        }

        console.log(filter)

        dispatch({
            type: COMMENT_ACTION_TYPES.GET_COMMENTS,
            payload: filter
        })

        crudApi().getComments(filter)
            .then(
                res => {
                    if (res.data.error) {

                        dispatch({
                            type: COMMENT_ACTION_TYPES.GET_COMMENTS_FAILED
                        })

                        return
                    }

                    const data = res.data
                    const comments = data.comments

                    const state = store.getState()
                    const commentsReducer = state.commentsReducer

                    comments.map((comment, index, array) => {
                        const user = comment.user

                        if (commentsReducer.usersMap.has(user.id)) {
                            return comment
                        }

                        const imageModel = new ImageModel()

                        imageModel.noImg = no_avatar
                        imageModel.noImgWidth = no_avatarWidth
                        imageModel.noImgHeight = no_avatarHeight

                        imageModel.updateReducerConst = COMMENT_ACTION_TYPES.UPDATE_COMMENT_REDUCER
                        imageModel.updateReducerPayload = comment
                        imageModel.isAuth = false
                        imageModel.state = LOAD_STATES.NONE

                        user.imageModel = imageModel

                        if (user.avatarFileName) {

                            const pathModel = new PathModel("profiles/" + user.id + "/avatar", user.avatarFileName)
                            imageModel.pathModel = pathModel

                            dispatch(downloadImageAction(imageModel))

                        }

                        return comment
                    })

                    console.log(data)

                    dispatch({
                        type: COMMENT_ACTION_TYPES.GET_COMMENTS_SUCCESS,
                        payload: data
                    })

                }
            )
            .catch(
                err => {
                    dispatch({
                        type: COMMENT_ACTION_TYPES.GET_COMMENTS_FAILED
                    })
                }
            )
    }
}

export const resetCommentReducerAction = () => {
    return dispatch => {
        dispatch({
            type: COMMENT_ACTION_TYPES.RESET_COMMENT_REDUCER
        })
    }
}