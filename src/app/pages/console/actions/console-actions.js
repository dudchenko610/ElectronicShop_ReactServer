
export const CONSOLE_ACTION_TYPES = {
    PICK_CATEGORY: "PICK_CATEGORY",
    SWITCH_TO_UPLOADING_PRODUCTS: "SWITCH_TO_UPLOADING_PRODUCTS",
    SWITCH_TO_DEFAULT_PRODUCTS: "SWITCH_TO_DEFAULT_PRODUCTS",

    UPDATE_CONSOLE_REDUCER: "UPDATE_CONSOLE_REDUCER"
}

export const pickCategoryAction = (category) => {
    return dispatch => {
        dispatch({
            type: CONSOLE_ACTION_TYPES.PICK_CATEGORY,
            payload: category
        })
    }
}


export const switchToUploadingProductsAction = () => {
    return dispatch => {
        dispatch({
            type: CONSOLE_ACTION_TYPES.SWITCH_TO_UPLOADING_PRODUCTS
        })
    }
}

export const switchToDefaultProductsAction = () => {
    return dispatch => {
        dispatch({
            type: CONSOLE_ACTION_TYPES.SWITCH_TO_DEFAULT_PRODUCTS
        })
    }
}

export const updateConsoleReducerAction = () => {
    return dispatch => {
        dispatch({
            type: CONSOLE_ACTION_TYPES.UPDATE_CONSOLE_REDUCER
        })
    }
}