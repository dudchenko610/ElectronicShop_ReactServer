
export const POPUP_ACTION_TYPES = {
    POPUP_HIDDEN: "hidden",
    POPUP_WAITING: "waiting",
    POPUP_ALERT: "alert",
    POPUP_ALERT_X: "alert_x",

    POPUP_UPDATE: "POPUP_UPDATE"
}

export const updatePopupAction = () => {
    return dispatch => {
        dispatch({
            type: POPUP_ACTION_TYPES.POPUP_UPDATE
        })
    }
}

export const hidePopupAction = (popupDiv) => {
    return {
        type: POPUP_ACTION_TYPES.POPUP_HIDDEN,
        payload: popupDiv
    }
}

export const showWaitingPopupAction = (popupDiv) => {
    return {
        type: POPUP_ACTION_TYPES.POPUP_WAITING,
        payload: popupDiv
    }
}

export const showAlertPopupAction = (popupStyle, popupDiv) => {
    return {
        type: POPUP_ACTION_TYPES.POPUP_ALERT,
        payload: {
            div : popupDiv,
            popupStyle : popupStyle
        }
    }
}

export const showAlertPopupXAction = (popupStyle, popupDiv) => {
    return {
        type: POPUP_ACTION_TYPES.POPUP_ALERT_X,
        payload: {
            div : popupDiv,
            popupStyle : popupStyle
        }
    }
}