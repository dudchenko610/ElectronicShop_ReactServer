import { CURRENT_PAGE_TYPES } from "../actions/page-actions"

const initialState = {
    currentPage: CURRENT_PAGE_TYPES.EMPTY_PAGE
}

export const currentPageReducer = (state = initialState, action) => {

    switch (action.type) {
        case CURRENT_PAGE_TYPES.HOME_PAGE:
        case CURRENT_PAGE_TYPES.REGISTER_PAGE:
        case CURRENT_PAGE_TYPES.LOGIN_PAGE:
        case CURRENT_PAGE_TYPES.PROFILE_PAGE:
        case CURRENT_PAGE_TYPES.PROFILESETTINGS_PAGE:
        case CURRENT_PAGE_TYPES.CHAT_PAGE:
        case CURRENT_PAGE_TYPES.CONSOLE_PAGE:
            return {
                currentPage: action.type
            }

        default:
            return state

    }


}