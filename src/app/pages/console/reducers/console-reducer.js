
import {CONSOLE_ACTION_TYPES} from "../actions/console-actions"

const initialState = () => {
    return {
        currentCategory: null,
        defaultProductList: true
    }
}

export const consoleReducer = (state = initialState(), action) => {
    switch(action.type) {
        case CONSOLE_ACTION_TYPES.PICK_CATEGORY:
            return {
                ...state,
                currentCategory : action.payload
            }

        case CONSOLE_ACTION_TYPES.SWITCH_TO_UPLOADING_PRODUCTS:

            return {
                ...state,
                defaultProductList: false 
            }

        case CONSOLE_ACTION_TYPES.SWITCH_TO_DEFAULT_PRODUCTS:

            return {
                ...state,
                defaultProductList: true
            }
        
        case CONSOLE_ACTION_TYPES.UPDATE_CONSOLE_REDUCER:
            return {
                ...state
            }
    }

    return state

}