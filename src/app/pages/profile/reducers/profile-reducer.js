import { PROFILE_ACTION_TYPES } from "../../../common/actions/meuser-actions"

import { LOAD_STATES } from "../../../../core/load-states"

const ADMIN = "ADMIN"
const CLIENT = "CLIENT"


export const profileReducer = (state, action) => {
    switch (action.type) {
        
        case PROFILE_ACTION_TYPES.GET_USER:
            state.state = LOAD_STATES.LOADING
            return true

        case PROFILE_ACTION_TYPES.GET_USER_SUCCESS:

            const userRole = action.payload
            
            state.user = userRole.user
            state.role = userRole.role
            state.avatarModel = userRole.avatarModel
            state.isAuthenticated = true
            

            if (state.role === ADMIN) {
                state.isAdmin = true
            }

            state.state = LOAD_STATES.READY

            return true
        case PROFILE_ACTION_TYPES.UPDATE_PROFILE_REDUCER:
            return true

        case PROFILE_ACTION_TYPES.GET_USER_FAILED:
            // initial state
            state.authToken = ""
            state.client = null
            state.user = null
            state.isAuthenticated = false
            state.isAdmin = false
            state.avatarModel = null
            state.state = LOAD_STATES.NONE

            return true
        
    }

    return false
}