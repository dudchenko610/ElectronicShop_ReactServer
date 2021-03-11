import { combineReducers } from "redux"

import {currentPageReducer} from "./page-reducer"
import {popupReducer} from "./popup-reducer"
import {meuserReducer} from "./meuser-reducer"
import {signalRReducer} from "./signalr-reducer"
import {userDataReducer} from "./user-data-reducer"

import {categoriesReducer} from "../crud/categories/reducers/category-reducer"
import {manufacturerReducer} from "../crud/manufacturers/reducers/manufacturer-reducer"
import {characteristicReducer} from "../crud/characteristics/reducers/characteristic-reducer"
import {productsReducer} from "../crud/products/reducers/product-reducer"

import {doubleListReducer} from "../components/double-list-wrapper/reducers/double-list-reducer"
import {consoleReducer} from "../../pages/console/reducers/console-reducer"

import { chatReducer } from "../../pages/chat/reducers/chat-reducer"
import { commentsReducer } from "../crud/comments/reducers/comment-reducer"
import { orderReducer } from "../crud/orders/reducers/order-reducer"

export const allReducers = combineReducers({

    currentPageReducer : currentPageReducer,
    popupReducer : popupReducer,
    meuserReducer: meuserReducer,
    signalRReducer : signalRReducer,
    userDataReducer : userDataReducer,


    categoriesReducer: categoriesReducer,
    manufacturerReducer: manufacturerReducer,
    characteristicReducer: characteristicReducer,
    productsReducer : productsReducer,

    doubleListReducer : doubleListReducer,
    consoleReducer : consoleReducer,

    chatReducer: chatReducer,
    commentsReducer: commentsReducer,

    orderReducer: orderReducer


})

export default allReducers