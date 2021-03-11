export const DOUBLE_LIST_ACTION_TYPES = {

    LIST_DID_MOUNT : "LIST_DID_MOUNT",
    LIST_WILL_UNMOUNT : "LIST_WILL_UNMOUNT",

    EXPAND_ITEM: "EXPAND_ITEM"

}


export const listDidMountAction = (doubleListId, upperWithExpandOpts) => {
    return dispatch => {
        dispatch
        (
            {
                type: DOUBLE_LIST_ACTION_TYPES.LIST_DID_MOUNT,
                payload: {
                    doubleListId : doubleListId,
                    upperWithExpandOpts : upperWithExpandOpts
                }
            }
        ) 
    }
}

export const listWillUnmountAction = (doubleListId) => {
    return dispatch => {
        dispatch
        (
            {
                type: DOUBLE_LIST_ACTION_TYPES.LIST_WILL_UNMOUNT,
                payload: {
                    doubleListId : doubleListId
                }
            }
        )
    }
}

export const expandItemAction = (upperElement, doubleListId) => {
    return dispatch => {
        dispatch
        (
            {
                type: DOUBLE_LIST_ACTION_TYPES.EXPAND_ITEM,
                payload: {
                    upperElement: upperElement,
                    doubleListId : doubleListId
                }
            }
        )
    }
}