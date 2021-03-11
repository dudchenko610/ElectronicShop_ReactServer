import React from "react"
import {store} from "../../../index"

import { showAlertPopupAction } from "../actions/popup-actions"

import {initSignalRAction, signalRListener} from "../actions/signalr-actions"
import {getUserAction, userListener} from "../actions/meuser-actions"

import {getCategoriesAction, categoriesListener} from "../crud/categories/actions/category-actions"
import {getManufacturersAction, manufacturersListener} from "../crud/manufacturers/actions/manufacturer-actions"
import {getCharacteristicsAction, characteristicsListener} from "../crud/characteristics/actions/characteristic-actions"

export const initSystemAuthAction = () => {
    return dispatch => {
        const sListener = signalRListener()
        store.dispatch(showAlertPopupAction(sListener.styleWaiting, sListener.waitingDiv))
        store.dispatch(initSignalRAction(sListener))

        const uListener = userListener()
        store.dispatch(showAlertPopupAction(uListener.styleWaiting, uListener.waitingDiv))
        store.dispatch(getUserAction(uListener))
    }
}

export const initSystemCommonAction = () => {
    return dispatch => {

        const onCategoriesLoaded = () => {
            const charactListener = characteristicsListener()
            store.dispatch(showAlertPopupAction(charactListener.styleWaiting, charactListener.waitingDiv))
            store.dispatch(getCharacteristicsAction(charactListener))
        }

        const catListener = categoriesListener(onCategoriesLoaded)
        store.dispatch(showAlertPopupAction(catListener.styleWaiting, catListener.waitingDiv))
        store.dispatch(getCategoriesAction(catListener))

        const manufactListener = manufacturersListener()
        store.dispatch(showAlertPopupAction(manufactListener.styleWaiting, manufactListener.waitingDiv))
        store.dispatch(getManufacturersAction(manufactListener))


    }
}