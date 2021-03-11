import {LOAD_STATES} from "../../../../core/load-states"

import {USER_ACTION_TYPES} from "../actions/user-actions"


const avatarInitialModel = () => {
    return {
        content: null,
        state: LOAD_STATES.NONE
    }
}

const messagesInitialModel = () => {
    return {
        messages: [],
        state : LOAD_STATES.LOADING
    }
}


export const usersReducer = (state, action) => {

    let userId
    let userData

    switch (action.type) {

        case USER_ACTION_TYPES.INSERT_USER:
            const user = action.payload

            // it is brand new user that is inserted to this collection

            state.content.set(user.id, user)

            return true

        case USER_ACTION_TYPES.GET_USERS:

            state.state = LOAD_STATES.LOADING
            state.content.clear()

            if (action.payload.paginationFilter) {
                state.paginationFilter = action.payload.paginationFilter
            }

            if (action.payload.userFilter) {
                state.productFilter = action.payload.userFilter
            }

            return true

        case USER_ACTION_TYPES.GET_USERS_SUCCESS:

            state.state = LOAD_STATES.READY

            const pagedResponse = action.payload

            if (!state.paginationFilter) {
                state.paginationFilter = {}
            }

            state.paginationFilter.pageNumber   = pagedResponse.pageNumber
            state.paginationFilter.pageSize     = pagedResponse.pageSize
            state.paginationFilter.totalPages   = pagedResponse.totalPages
            state.paginationFilter.totalRecords = pagedResponse.totalRecords

            const users = pagedResponse.data
            users.map((user, index, array) => {
                state.content.set(user.id, user)
            })

            if (state.content.size == 0) {
                state.state = LOAD_STATES.NONE
            }

            return true

        case USER_ACTION_TYPES.GET_USERS_FAILED:

            state.state = LOAD_STATES.FAILED
            state.content.clear()

            return true

        case USER_ACTION_TYPES.UPDATE_USERS_REDUCER:
            return true



        case USER_ACTION_TYPES.GET_USER:

            state.currentUser = null
            state.stateCurrent = LOAD_STATES.LOADING

            return true

        case USER_ACTION_TYPES.GET_USER_SUCCESS:

            state.currentUser = action.payload
            state.stateCurrent = LOAD_STATES.READY

            return true
        
        case USER_ACTION_TYPES.GET_USER_FAILED:

            state.currentUser = null

            if (action.payload) {
                state.stateCurrent = LOAD_STATES.NONE
            } else {
                state.stateCurrent = LOAD_STATES.FAILED
            }

            return true


        default:
            return false
    }
}