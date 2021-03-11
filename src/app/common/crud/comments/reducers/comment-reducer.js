
import { COMMENT_ACTION_TYPES } from "../actions/comment-actions"
import {LOAD_STATES} from "../../../../../core/load-states"
import { replaceMapElementToTop } from "../../../../../core/array-methods"

const initialState = () => {
    return {

        content: new Map(),
        state: LOAD_STATES.NONE,

        addingNewState: LOAD_STATES.NONE,
        addingCounter: 0,

        gettingCommentsState : LOAD_STATES.NONE,
        hasMore: true,

        currentFilter: null,

        usersMap: new Map()
        
    }
}

export const commentsReducer = (state = initialState(), action) => {
    switch (action.type) {

        /// ADD COMMENT

        case COMMENT_ACTION_TYPES.ADD_COMMENT:
        {

            const comment = action.payload
            comment.state = LOAD_STATES.LOADING

            state.addingNewState = LOAD_STATES.LOADING
            state.addingCounter ++

            console.log(comment)

            return {
                ...state
            }
        }

        case COMMENT_ACTION_TYPES.ADD_COMMENT_SUCCESS:
        {

            const comment = action.payload
            comment.state = LOAD_STATES.READY

            state.content.set(comment.id, comment)

            replaceMapElementToTop(state.content, comment, comment.id)

            state.state = LOAD_STATES.READY
         //   console.log(comment)


            state.addingCounter --

            if (state.addingCounter == 0) {
                state.addingNewState = LOAD_STATES.NONE
            }

            return {
                ...state
            }
        }

        case COMMENT_ACTION_TYPES.ADD_COMMENT_FAILED:
        {

            const comment = action.payload
            comment.state = LOAD_STATES.FAILED

            console.log(comment)


            state.addingCounter --

            if (state.addingCounter == 0) {
                state.addingNewState = LOAD_STATES.NONE
            }
            
            return {
                ...state
            }
        }


        /// GET COMMENTS

        case COMMENT_ACTION_TYPES.GET_COMMENTS:
        {

            const filter = action.payload
            state.currentFilter = filter

            if (state.content.size == 0) {
                state.state = LOAD_STATES.LOADING
            } else {
                state.gettingCommentsState = LOAD_STATES.LOADING
            }


            return {
                ...state
            }
        }

        case COMMENT_ACTION_TYPES.GET_COMMENTS_SUCCESS:
        {
            const data = action.payload
            const comments = data.comments

            state.hasMore = data.hasMore
            state.state = LOAD_STATES.READY
            state.gettingCommentsState = LOAD_STATES.READY
            

            comments.map((comment, index, arr) => {
                comment.state = LOAD_STATES.READY
                state.content.set(comment.id, comment)


                if (state.usersMap.has(comment.userId)) {
                    const user = state.usersMap.get(comment.userId)
                    comment.user.imageModel = user.imageModel
                } else {
                    const user = comment.user
                    state.usersMap.set(user.id, user)
                }
            })

            if (state.content.size == 0) {
                state.state = LOAD_STATES.NONE
            }


            return {
                ...state
            }
        }

        case COMMENT_ACTION_TYPES.GET_COMMENTS_FAILED:
        {

            if (state.content.size == 0) {
                state.state = LOAD_STATES.FAILED
            } else {
                state.gettingCommentsState = LOAD_STATES.FAILED
            }

            return {
                ...state
            }
        }


        /// REMOVE COMMENTS

        case COMMENT_ACTION_TYPES.REMOVE_COMMENT:
        {

            const commentId = action.payload
            const comment = state.content.get(commentId)

            comment.state = LOAD_STATES.LOADING

            return {
                ...state
            }
        }

        case COMMENT_ACTION_TYPES.REMOVE_COMMENT_SUCCESS:
        {

            const commentId = action.payload
            state.content.delete(commentId)

            return {
                ...state
            }
        }

        case COMMENT_ACTION_TYPES.REMOVE_COMMENT_FAILED:
        {

            const commentId = action.payload
            const comment = state.content.get(commentId)

            comment.state = LOAD_STATES.READY

            return {
                ...state
            }
        }


        case COMMENT_ACTION_TYPES.RESET_COMMENT_REDUCER:
        {
            return {
                content: new Map(),
                state: LOAD_STATES.NONE,

                addingNewState: LOAD_STATES.NONE,
                addingCounter: 0,

                gettingCommentsState : LOAD_STATES.NONE,
                hasMore: true,

                currentFilter: null,
                usersMap: new Map()

            }
        }

        case COMMENT_ACTION_TYPES.UPDATE_COMMENT_REDUCER:
        {
            return {
                ...state
            }
        }

    }

    return state
}

