import {DOUBLE_LIST_ACTION_TYPES} from "../actions/double-list-actions"

const initialState = {
    doubleListIds: new Map()
}

export const doubleListReducer = (state = initialState, action) => {
    switch (action.type) {
        case DOUBLE_LIST_ACTION_TYPES.LIST_DID_MOUNT:

            const doubleListId = action.payload.doubleListId
            const upperWithExpandOpts = action.payload.upperWithExpandOpts

            state.doubleListIds.set(doubleListId, upperWithExpandOpts)
            return {
                ...state
            }

        case DOUBLE_LIST_ACTION_TYPES.LIST_WILL_UNMOUNT:

            state.doubleListIds.delete(action.payload)
            return {
                ...state
            }

        case DOUBLE_LIST_ACTION_TYPES.EXPAND_ITEM:

            const upperElement = action.payload.upperElement
            const doubleListId_ = action.payload.doubleListId

            const upperWithExpandsOpts = state.doubleListIds.get(doubleListId_)

            const mappedVal = upperWithExpandsOpts.get(upperElement)
            
            if (mappedVal) {
                mappedVal.expanded = !mappedVal.expanded
            } else {
                upperWithExpandsOpts.set(upperElement, {
                    expanded : true
                })
            }

            return {
                ...state
            }
    }

    return state
}