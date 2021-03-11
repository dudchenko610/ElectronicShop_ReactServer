import {LOAD_STATES} from "../../../core/load-states"

//import {chatReducer} from "../../pages/chat/reducers/chat-reducer"
import {usersReducer} from "../../pages/user/reducers/users-reducer"



const initialState = () => {
    return {

        content: new Map(), // users
        state: LOAD_STATES.NONE,

        paginationFilter: {},
        userFilter: {},

        currentUser: null,
        stateCurrent: LOAD_STATES.NONE
    }
}

export const userDataReducer = (state = initialState(), action) => {

    if (/*chatReducer(state, action) | */usersReducer(state, action)) {
        return {
            ...state
        }
    }

    return state
    
}


